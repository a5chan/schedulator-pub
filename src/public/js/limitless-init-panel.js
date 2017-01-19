export default (panel) => {
    $(function() {
        // Calculate min height
        function containerHeight() {
            var availableHeight = $(window).height() - $('.page-container').offset().top - $('.navbar-fixed-bottom').outerHeight();

            $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');
        }

        // Add control button toggler to page and panel headers if have heading elements
        $(panel).find('.panel-heading, .page-header-content, .panel-body, .panel-footer').has('> .heading-elements').append('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');

        // Reload
        $(panel).find('.panel [data-action=reload]').click(function (e) {
            e.preventDefault();
            var block = $(this).parent().parent().parent().parent().parent();
            $(block).block({
                message: '<i class="icon-spinner2 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 1px #ddd'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none'
                }
            });

            // For demo purposes
            window.setTimeout(function () {
               $(block).unblock();
            }, 2000);
        });

        // Hide if collapsed by default
        $(panel).find('.panel-collapsed').children('.panel-heading').nextAll().hide();

        // Rotate icon if collapsed by default
        $(panel).find('.panel-collapsed').find('[data-action=collapse]').addClass('rotate-180');

        // Collapse on click
        $(panel).find('.panel [data-action=collapse]').click(function (e) {
            e.preventDefault();
            var $panelCollapse = $(this).parent().parent().parent().parent().nextAll();
            $(this).parents('.panel').toggleClass('panel-collapsed');
            $(this).toggleClass('rotate-180');

            containerHeight(); // recalculate page height

            $panelCollapse.slideToggle(150);
        });

        // Remove
        $(panel).find('.panel [data-action=close]').click(function (e) {
            e.preventDefault();
            var $panelClose = $(this).parent().parent().parent().parent().parent();

            containerHeight(); // recalculate page height

            $panelClose.slideUp(150, function() {
                $(this).remove();
            });
        });
    });
}