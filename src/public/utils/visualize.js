import d3 from 'd3';

var metricsHeight  = 500;
var resize         = null; // Pointer for removing event listeners.
var resizeTimeout  = null;

var removeListeners = function () {
    if (resize) { // If resize is null it removes all handlers.
        $(window).off('resize', resize);
        $('.sidebar-control').off('click', resize);
    }
};

export default function (id, data, options) {
    var d3Container = d3.select(id);

    /** Reset */

    d3Container.select('svg').remove();
    removeListeners(); // Clean slate.

    options = options || {};

    var margin = {
        top    : 5,
        right  : 20,
        bottom : 20,
        left   : 40
    };

    var width  = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;
    var height = metricsHeight - margin.top - margin.bottom - 5;

    var parseDate = d3.time.format('%d-%b-%y').parse;

    var bisectDate = d3.bisector(function (d) {
        return d.date;
    }).left;

    var formatValue = d3.format(',.2f'); // Float with 2 decimals.

    var formatCurrency = function (d) {
        return '$' + formatValue(d);
    };

    /** Scales */

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    /** Axes */

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .ticks(Math.min(data.length, 10))
        .tickFormat(d3.time.format('%b \'%y'));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    if (options.yAxisTickFormat) {
        yAxis.tickFormat(options.yAxisTickFormat);
    }

    /** Chart */

    var container = d3Container.append('svg');

    var svg = container
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var line = d3.svg.line()
        // .interpolate('monotone')
        .interpolate('linear')
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.value);
        });

    /** Parse Data */

    data.forEach(function (d) {
        d.date  = parseDate(d.date);
        d.value = +d.value; // Convert to number.
    });

    data.sort(function (a, b) {
        return a.date - b.date;
    });

    /** Input Domains */

    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));

    // y.domain([0, d3.max(data, function (d) {
    //     return d.value * 1.1; // 10% above max.
    // })]);

    y.domain([d3.min(data, function (d) {
        return d.value * 0.9; // 10% below min.
    }), d3.max(data, function (d) {
        return d.value * 1.1; // 10% above max.
    })]);

    /** Add Line */

    svg.append('path')
        .datum(data)
            .attr('class', 'd3-line d3-line-medium')
            .attr('d', line)
            .style('fill', 'none')
            .style('stroke-width', 2)
            .style('stroke', '#2196F3');

    /** Append Axes */

    svg.append('g')
        .attr('class', 'd3-axis d3-axis-horizontal d3-axis-strong')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    var verticalAxis = svg.append('g')
        .attr('class', 'd3-axis d3-axis-vertical d3-axis-strong')
        .call(yAxis);

    /*verticalAxis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 10)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .style('fill', '#999')
        .style('font-size', 12)
        .text('Price ($)');*/

    /** Append Tooltip */

    var focus = svg.append('g')
        .attr('class', 'd3-crosshair-pointer')
        .style('display', 'none');

    focus.append('circle')
        .attr('r', 4) // Radius.
        .style('fill', '#fff')
        .style('stroke', '#2196F3')
        .style('stroke-width', 2);

    focus.append('text')
        .attr('dy', '.35em')
        .style('fill', '#2196F3')
        .style('stroke', 'none');

    var mousemove = function () {
        var x0 = x.invert(d3.mouse(this)[0]);
        var i  = bisectDate(data, x0, 1);
        var d0 = data[i - 1];
        var d1 = data[i];
        var d  = x0 - d0.date > d1.date - x0 ? d1 : d0;

        var value = d.value;
        var text  = value.toString();

        // if (options.isMoney) {
        //     text = $filter('currency')(text, '$', 0);
        // }

        focus.attr('transform', 'translate(' + x(d.date) + ',' + y(value) + ')');
        focus.select('text').text(text).attr('dx', -4 * text.length).attr('dy', -10);
    };

    svg.append('rect')
        .attr('class', 'd3-crosshair-overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', function () {
            focus.style('display', null);
        })
        .on('mouseout', function () {
            focus.style('display', 'none');
        })
        .on('mousemove', mousemove);

    /** Resize */

    resize = function () {
        clearTimeout(resizeTimeout);

        // resizeTimeout =setTimeout(function () {
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;

            /** Really only concerned with horizontal resizing. */
            container.attr('width', width + margin.left + margin.right);
            svg.attr('width', width + margin.left + margin.right);
            x.range([0, width]);
            svg.selectAll('.d3-axis-horizontal').call(xAxis);
            svg.selectAll('.d3-line').attr('d', line);
            svg.selectAll('.d3-crosshair-overlay').attr('width', width);
        // }, 1000);
    };

    $(window).resize(resize);
    $('.sidebar-control').click(resize);
};