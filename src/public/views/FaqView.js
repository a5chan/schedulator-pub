import React from 'react';
import ReactDOM from 'react-dom';

export default class FaqView extends React.Component {

    constructor() {
        super();
        this.goBack = () =>  {
          this.props.history.push('/support');
        }
    }

    render() {
      console.log("FAQ loaded");
      return (
        <div>
          <button type="button" onClick={this.goBack}>Back</button>
          <h1>Frequently Asked Questions</h1>
        </div>
      );    
    }
}