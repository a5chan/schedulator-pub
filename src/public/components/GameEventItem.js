import React from 'react';
import Popover from 'material-ui/Popover';
import DatePickerComponent from './DatePicker'

export default class GameEventItem extends React.Component {


    constructor(props) {
        super(props)

        // Load initial state
        this.state = {}
    }

    render() {
        return (<div>{this.props.name}</div>)
    }
}
