import React from 'react';
import ReactDOM from 'react-dom';

export default class SettingsView extends React.Component {

    constructor() {
        super();
    }

    render() {
      console.log("settings loaded");
      return (
        <div>
          <h1>Settings</h1>
        </div>
        );    
    }
}