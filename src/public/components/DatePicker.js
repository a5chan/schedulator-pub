import React from 'react';
import DatePicker from 'material-ui/DatePicker'

const styles = {
    span: {
        cursor: "pointer",
        position: "relative"
    },
    datePicker: {
        width:"80px",
        cursor: "pointer",
        fontSize: "13px",
        color: "#222 !important"
    },
    icon: {
        position: "absolute",
        top: "0",
        left: "100%"
    }
};

export default class DatePickerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoOk: false,
            disableYearSelection: true,
        };

        this.handleDateChange = (evt, date) => {
            if (this.props.onChange) {
                this.props.onChange(date);
            }
        }
    }

    renderCalendarIcon() {
        return <i style={styles.icon} className="fa fa-calendar" aria-hidden="true"></i>;
    }

    render() {
        return (
            <span style={styles.span}>
                <DatePicker
                     id={this.props.id}
                     hintText="Event Date"
                     mode="landscape"
                     onChange={this.handleDateChange}
                     textFieldStyle={styles.datePicker}
                     style={{cursor:"pointer", color:"#222 !important"}}
                     container='inline'
                     autoOk={true}
                     value={this.props.initialValue ? this.props.initialValue : null}/>
            </span>
        );
    }

}