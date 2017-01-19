import React from 'react';
import Popover from 'material-ui/Popover';
import DatePickerComponent from './DatePicker'
import Button from './Button';


export default class AddPopOver extends React.Component {


    constructor(props) {
        super(props)

        // Load initial state
        this.state = {
            info: this.props.info,
            isOpen: false,
            text: this.props.text || ''
        }

        this.onCategoryNameChange = (event) => {
            //console.log(event);
            this.setState({text: event.target.value});
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleSubmit() {
        //TODO: do not submit when text is blank or if it already exists
        //TODO: send request to the server
        this.props.onCategorySubmit(this.state.text);
        this.setState({text: ""});
    }

    handleClose() {
        this.props.onClose();
    }

    handleDateChange (date) { 
        this.setState({date: date})
    }
    render() {
        //console.log(this.props.anchorEl);
        if (this.props.isOpen) {
            return (
                <div>      
                    <Popover 
                        open={this.props.isOpen}
                        style={{border: "3px solid #1C2428", background: "#304047", borderRadius:"15px"}}
                        anchorEl={this.props.anchorEl}
                        anchorOrigin={{horizontal: "right", vertical: "top"}}
                        targetOrigin={{horizontal: "left", vertical: "center"}}
                        zDepth={1}
                        canAutoPosition={false}
                        canAutoPosition={false}
                        autoCloseWhenOffScreen={false}
                        onRequestClose={this.handleClose}>

                    <form onSubmit={this.handleSubmit} style={{backgroundColor: '#455A64', padding:"20px",borderRadius:"15px"}}>
                        <input 
                            type="text" 
                            placeholder="Game Title" 
                            value={this.state.text} 
                            onChange={this.onCategoryNameChange}
                        /> 
                        <Button onClick={this.handleSubmit} label="Add Category"/>
                    </form>
                    </Popover>
                   
                </div>
            )
        } else {
            return (<div></div>)
        } 
    }
}
