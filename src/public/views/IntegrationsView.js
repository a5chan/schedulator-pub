import React from 'react';
import ReactDOM from 'react-dom';

export default class IntegrationsView extends React.Component {

    constructor() {
        super();
    }

    openDiscordWindow() {
        window.open('https://discordapp.com/oauth2/authorize?&client_id=242370242280423425&scope=webhook.incoming bot identify&redirect_ur=http://localhost:3000/api/discord/callback&permissions=0&response_type=code');
    }
    //<a href="https://slack.com/oauth/authorize?scope=channels:read chat:write:bot&client_id=47750367445.100096842215"><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a>
    render() {
      return (
        <div>
          <h1>Integrations</h1>
          <button type = "button" onClick={this.openDiscordWindow} value ="Integrate with discord"/>
          <a href="https://slack.com/oauth/authorize?scope=incoming-webhook users.profile:read bot channels:read chat:write:bot&client_id=47750367445.100096842215"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
        </div>
        );    
    }
}