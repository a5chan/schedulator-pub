import React from 'react';
import TimePicker from 'material-ui/TimePicker'

export default class TimePickerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleTimeChange = (event, time) => {
            if (this.props.handleTimeChange) {
                this.props.handleTimeChange(time);
            }
        }
    }

    render() {
        return (
            <div style={{zIndex: 5000}}> 
                <TimePicker
                     id={this.props.id}
                     hintText="Event Time"
                     onChange={this.handleTimeChange}
                     defaultTime={new Date(Date.now())}
                     value={this.props.time}
                     style={{zIndex: 5000}}/>
            </div>
        );
    }

}