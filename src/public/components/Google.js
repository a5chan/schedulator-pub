import React from 'react';
import GoogleLogin from 'react-google-login';
import FaGooglePlusSquare from 'react-icons/lib/fa/google-plus-square';

var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar',
  'email',
  'https://www.googleapis.com/auth/drive',
  'profile',
  'https://www.googleapis.com/auth/userinfo.profile'
];

export default class Google extends React.Component {


    constructor(props) {
        super(props)

        this.responseGoogle = (response) => {
            if (response) {
                $.ajax({
                    url: "http://localhost:3000/api/oauth2callback/?code=" + response.code,
                    type: "GET",
                    success: function(data) { 
                      console.log(data.jwt);
                        window.location = '/#/loginRedirect?accessToken=' + data.jwt
                    }
                });
            }
        }
        // Load initial state
    }

    render() {

        return (<GoogleLogin
          clientId={'711072134220-o94f6r0ueeu21qee5gqndi9ndl472in1.apps.googleusercontent.com'}
          scope={scopes.join(' ')}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          offline={true}
          className="my-google-button-class"
          redirectUri='postmessage'>
            <FaGooglePlusSquare />
            Connect with Google+
          </GoogleLogin>
        )
    }
}