import React from 'react';
 
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
 
const symbolRegex = /stock\/\w+$/;
 
export default class Content extends React.Component {
 
    constructor(props)
    {
        super(props);
        let events = [
          {
            'title': 'All Day Event',
            'allDay': true,
            'start': new Date(2016, 3, 0),
            'end': new Date(2016, 3, 0),
            'hexColor': 'FFFFFF'
          },
          {
            'title': 'Long Event',
            'start': new Date(2015, 3, 7),
            'end': new Date(2015, 3, 10),
            'hexColor': 'AD1234'
          },
 
          {
            'title': 'DTS STARTS',
            'start': new Date(2016, 2, 13, 0, 0, 0),
            'end': new Date(2016, 2, 20, 0, 0, 0),
            'hexColor': 'FFFFFF'
          },
 
          {
            'title': 'DTS ENDS',
            'start': new Date(2016, 10, 6, 0, 0, 0),
            'end': new Date(2016, 10, 13, 0, 0, 0),
            'hexColor': '333333'
          },
 
          {
            'title': 'Some Event',
            'start': new Date(2015, 3, 9, 0, 0, 0),
            'end': new Date(2015, 3, 9, 0, 0, 0),
            'hexColor': '222222'
          },
          {
            'title': 'Conference',
            'start': new Date(2015, 3, 11),
            'end': new Date(2015, 3, 13),
            desc: 'Big conference for important people',
            'hexColor': '123456'
          },
          {
            'title': 'Meeting',
            'start': new Date(2015, 3, 12, 10, 30, 0, 0),
            'end': new Date(2015, 3, 12, 12, 30, 0, 0),
            desc: 'Pre-meeting meeting, to prepare for the meeting',
            'hexColor': 'ABCDEF'
          },
          {
            'title': 'Lunch',
            'start':new Date(2015, 3, 12, 12, 0, 0, 0),
            'end': new Date(2015, 3, 12, 13, 0, 0, 0),
            desc: 'Power lunch',
            'hexColor': 'DEFABC'
          },
          {
            'title': 'Meeting',
            'start':new Date(2015, 3, 12,14, 0, 0, 0),
            'end': new Date(2015, 3, 12,15, 0, 0, 0),
            'hexColor': 'ABCDEF'
          },
          {
            'title': 'Happy Hour',
            'start':new Date(2015, 3, 12, 17, 0, 0, 0),
            'end': new Date(2015, 3, 12, 17, 30, 0, 0),
            desc: 'Most important meal of the day',
            'hexColor': 'FFFA23'
          },
          {
            'title': 'Dinner',
            'start':new Date(2015, 3, 12, 20, 0, 0, 0),
            'end': new Date(2015, 3, 12, 21, 0, 0, 0),
            'hexColor': '3D2C12'
          },
          {
            'title': 'Birthday Party',
            'start':new Date(2015, 3, 13, 7, 0, 0),
            'end': new Date(2015, 3, 13, 10, 30, 0),
            'hexColor': 'CAD234'
          },
          {
            'title': 'testing 123',
            'start': new Date(2015, 3, 1, 0, 0),
            'end': new Date(2015, 3, 2, 0, 0),
            'hexColor': '351231'
          }
        ]
        this.state = {events: events};
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );
    }
 
    EventWeek(props)
    {
        return <strong>{props.event.title}</strong>
    }
 
    EventAgenda(props)
    {
        return <em>{props.event.title}</em>
    }
 
    renderCalendar() {
        if (this.state.events) {
            return (<BigCalendar
                        popup
                        style = {{'height': '800px'}}
                        events={this.state.events}
                        views={['month', 'week']}
                        defaultDate={new Date(2015, 3, 3)}
                        components={{
                          event: this.EventWeek,
                          agenda: {
                            event: this.EventAgenda
                          }
                        }}
                        onSelectSlot={(this.slotSelected)}
                        onSelectEvent={(this.eventSelected)}
                        eventPropGetter={(this.eventStyleGetter)}
                    />)
        }
    }
    slotSelected(event) {
      console.log("slot selected");
    }
    eventSelected(event) {
      console.log("event selected");
    }
 
    eventStyleGetter(event, start, end, isSelected) {
      //console.log("style getter");
      var backgroundColor = '#' + event.hexColor;
      var r = parseInt(event.hexColor.substring(0,2), 16);
      var g = parseInt(event.hexColor.substring(2,4), 16);
      var b = parseInt(event.hexColor.substring(4,6), 16);
      var yiq = ((r*299)+(g*587)+(b*114))/1000;
      
      if (yiq >= 128) {
        yiq = '#000000';
      }else if (yiq < 128){
        yiq = '#FFFFFF';
      }
      
      var style = {
          backgroundColor: backgroundColor,
          borderRadius: '0px',
          opacity: 0.8,
          color: yiq,
          border: '0px',
          display: 'block'
      };
      return {
          style: style
      };
    }

    renderView () {
      if(!(this.props.partials)){
        return(this.renderCalendar());
      }else{
        return(this.props.partials);
      }
    }

    render() {
        const href = window.location.href;
 
        let headerTitle = null;
 
       
        //console.log(events);
        if (symbolRegex.test(href)) {
            headerTitle = href.split('/').pop();
        } else {
            headerTitle = 'Dashboard';
        }
     //   console.log(this.props.partials);
        return (
            <div class="content-wrapper">
                <div class='page-header'>
                    <div class="page-header-content">
                        <div class="page-title">
                            <h4>
                                <i class="icon-arrow-left52 position-left"></i>
                                { headerTitle }
                            </h4>
                        </div>
 
                        <div class="heading-elements">
                            <div class="heading-btn-group">
                                <a href="#" class="btn btn-link btn-float text-size-small has-text"><i class="icon-bars-alt text-primary"></i><span>Statistics</span></a>
                                <a href="#" class="btn btn-link btn-float text-size-small has-text"><i class="icon-calendar5 text-primary"></i> <span>Schedule</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            {this.renderView()}
            </div>
        );
    }
}

