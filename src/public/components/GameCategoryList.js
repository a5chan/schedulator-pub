import React from 'react';
import ClickableButton from './ClickableButton';
import AddPopOver from './AddPopOver';
import Event from './Event';
import Menu from 'material-ui/Menu';
import request from 'superagent';
import cookie from 'react-cookie';
import Request from 'react-http-request';
import GameEventList from './GameEventList';

export default class GameCategoryList extends React.Component {


    constructor(props) {
        super(props)

        // Load initial state
        this.state = {
            categories: this.props.categories,
            isOpen: false
        }

        this.onCategorySubmit = (text) =>  {
            //console.log("text", text);
            var categories = this.state.categories;
            categories.push({name: text, categoryList: [] });
            
            let _this = this;

            request
              .post('http://localhost:3000/api/category')
              .send({name: text})
              .set('Authorization', cookie.load('accessToken'))
              .set('Accept', 'application/json')
              .end(function(err, res){
                // Calling the end function will send the request
                if (err) {
                    // handle error here
                }
                _this.setState({categories: categories, isOpen: false});
              });
        }

        this.handleClick = (event) => {
            this.setState({isOpen: true, anchorEl: event.currentTarget});
        }

        this.handleAddPopOverClose = this.handleAddPopOverClose.bind(this); 
    }

    renderAddPopOver () {
        return <AddPopOver anchorEl={this.state.anchorEl} onCategorySubmit={this.onCategorySubmit} onClose={this.handleAddPopOverClose} isOpen={this.state.isOpen} />
    }

    renderEvent(name){
        return <Event name={name}/>
    }

    handleAddPopOverClose () {
        this.setState({isOpen: false})
    }

    renderCategoryItems () {
        return this.state.categories.map((category) => {

            // Move this logic so that they only get to the events if they click the categories
            return (<div class="sidebar-user-material">
                        <div class = "sidebar-user-material-menu remove-margin">
                            <a href={"#"+category.name} data-toggle="collapse" class='text-slate'><span>{category.name}</span> <i class="caret"></i></a>
                        </div>

                        <div class="navigation-wrapper collapse" id={category.name}>
                            <ul class="navigation event-padding">
                               <Request
                                url={"http://localhost:3000/api/events/" + category._id}
                                method='get'
                                headers={{'Authorization': cookie.load('accessToken')}}
                                accept='application/json'
                                verbose={true}>
                                {
                                  ({error, result, loading}) => {
                                    if (loading) {
                                        return (<div>loading...</div>);
                                    } else if (error) {
                                        return  (<div>Error</div>)
                                    } else { 
                                        console.log(result)
                                        return (<GameEventList categoryId={category._id} events={result.body.data}/>)
                                    }
                                  }
                                }
                              </Request>
                            </ul>
                        </div>
                    </div>)
            
        })
    }

    render() {
        if (this.state.categories) {
            return (<div>
                <ul class = "navigation-header"> Game Categories
                    <div class = "row">
                        <ClickableButton onClick={this.handleClick} iconName="add"/>
                    </div>
                    {this.renderAddPopOver()}
                    
                </ul>
                {this.renderCategoryItems()}
            </div>)
        }
    }
}

