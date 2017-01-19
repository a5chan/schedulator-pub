import React from 'react';

import EventAddDialog from './EventAddDialog';
import GameEventItem from './GameEventItem';
import ClickableButton from './ClickableButton';
import request from 'superagent';
import cookie from 'react-cookie';

export default class GameEventList extends React.Component {

    constructor(props) {
        super(props)

        // Load initial state
        this.state = {
            events: this.props.events
        }
        
        this.onEventSubmit = (name, eventDate, slackPost, discordPost) =>  {
            let _this = this;

            let events = this.state.events;
            events.push({name: name, eventDate: eventDate, slackPost:slackPost, discordPost:discordPost, categoryId:this.props.categoryId});
            request
              .post('http://localhost:3000/api/event/')
              .send({
                name: name,
                eventDate: eventDate,
                slackPost: slackPost,
                discordPost: discordPost,
                categoryId: this.props.categoryId

              })
              .set('Authorization', cookie.load('accessToken'))
              .set('Accept', 'application/json')
              .end(function(err, res){
                // Calling the end function will send the request
                if (err) {
                    // handle error here
                }
                _this.setState({events: events, isOpen: false});
              });

        }
        this.handleClick = (event) => {
            this.setState({isOpen: true, anchorEl: event.currentTarget});
        }

        this.handleEventNameChange = (event) => {
            // AJAX REQUEST TO SERVER
            // UPDATE 
          //  this.setState({events: updatedEvents})    
        }

        this.handleClose = this.handleClose.bind(this);

    }

    renderEventDialog() {
        return <EventAddDialog onSubmit={this.onEventSubmit} onClose={this.handleClose} isOpen={this.state.isOpen}/>
    }

    handleClose() {
        this.setState({isOpen: false})
    }

    renderEventItems() {
        return this.state.events.map((event) => {
            return <GameEventItem name={event.name} onNameChange={this.handleEventNameChange} /> 
        })
    }

    render() {
        if (this.state.events) {
            return (<div>
                <ul class = "navigation-header">Events
                    <div class = "row">
                    {this.renderEventItems()}
                        <ClickableButton onClick={this.handleClick} onClose={this.handleAddDialogClose} iconName="add"/>
                    </div>
                </ul>
                {this.renderEventDialog()}
                
            </div>)
        }
    }
}
