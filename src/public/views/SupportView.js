import React from 'react';
import ReactDOM from 'react-dom';
import FaqView from './FaqView';

export default class SupportView extends React.Component {

    constructor() {
        super();
    }

    renderSupportSection () {
        console.log(this.props.children);
        if(!(this.props.children)) {
            return(
                <div>
                    <h1>Support</h1>
                    <a href="#/support/faq">FAQ</a>
                </div>
            );
        }
        else{
            return(this.props.children);
        }
    }
    render() {
        return (
            <div>
                {this.renderSupportSection()}
            </div>
        );    
    }
}