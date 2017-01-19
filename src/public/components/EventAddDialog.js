import React from 'react';
import Popover from 'material-ui/Popover';
import DatePickerComponent from './DatePicker'
import TimePickerComponent from './TimePicker'
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import AddCheckbox from './AddCheckbox';
import Button from './Button';

export default class EventAddDialog extends React.Component {


    constructor(props) {
        super(props)

        // Load initial state
        this.state = this.loadBlankState(props);

        this.handleTimeChange = (time) => {
            this.setState({time: time})

        }

        this.handleSubmit = ()  => {
            //TODO: do not submit when text is blank or if it already exists
            //TODO: send request to the server 
           // console.log(this.state.time)
           // console.log(this.state.date);
           //console.log(eventDate);
            let hours = moment(this.state.time).get('hours');
            let minutes = moment(this.state.time).get('minutes');
            let seconds = moment(this.state.time).get('seconds');

            let eventDate = new Date(moment(this.state.date).set('hour', hours).set('minute', minutes).set('second', seconds))
            
            let slack = this.state.isSlackChecked;
            let discord = this.state.isDiscordChecked
            this.props.onSubmit(this.state.eventName, eventDate, slack, discord) //////);
            this.setState(this.loadBlankState());
        }

        this.handleClose = () => {
            this.props.onClose();
        }

        this.handleDateChange = (date) => { 
            this.setState({date: date})
        }

        this.onHandleClick = () =>{

        }

        this.onEventNameChange = (event) =>{
            this.setState({eventName: event.currentTarget.value})
        }
        
    }

    loadBlankState(props) {
        return {
            time: '',
            date: '',
            eventName: '',
            isSlackChecked:false,
            isDiscordChecked:false
        }
    }

    render() {
        //console.log(this.props.anchorEl);
        if (this.props.isOpen) {
            return (
                <div>      
                    <Dialog onRequestClose={this.handleClose} open={this.props.isOpen}>
                        <form onSubmit={this.handleSubmit} style={{backgroundColor: '#455A64', padding:"20px",borderRadius:"15px"}}>
                            <input 
                                type="text" 
                                placeholder="Event name" 
                                value={this.state.eventName} 
                                onChange={this.onEventNameChange}
                            /> 
                            <DatePickerComponent onChange={this.handleDateChange} initialValue={this.state.date}/> 
                            <TimePickerComponent time={this.state.time} handleTimeChange={this.handleTimeChange}/> 
                            <AddCheckbox
                                onClick={(checked)=>{this.setState({isSlackChecked:checked})}}
                                label="Post to Slack"
                                labelStyle={{color:"white"}}
                                isChecked = {this.state.isSlackChecked}
                            />
                            <AddCheckbox
                                onClick={(checked)=>{this.setState({isDiscordChecked:checked})}}
                                label="Post to Discord"
                                labelStyle={{color:"white"}}
                                isChecked = {this.state.isDiscordChecked}
                            />
                            <Button onClick={this.handleSubmit} label="Add event"/>
                        </form>
                    </Dialog>
                </div>
            )
        } else {
            return (<div></div>)
        } 
    }
}

/*
<Popover 
                        open={this.props.isOpen}
                        style={{border: "3px solid #1C2428", background: "#304047", borderRadius:"15px"}}
                        anchorEl={this.props.anchorEl}
                        anchorOrigin={{horizontal: "right", vertical: "top"}}
                        targetOrigin={{horizontal: "left", vertical: "center"}}
                        zDepth={1}
                        canAutoPosition={false}
                        animation={this.test}
                        canAutoPosition={false}
                        autoCloseWhenOffScreen={false}
                        onRequestClose={this.handleClose}>
*/