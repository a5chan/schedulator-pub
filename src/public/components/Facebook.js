import React from 'react';
import FacebookLogin from 'react-facebook-login';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';


export default class Facebook extends React.Component {


    constructor(props) {
        super(props)

        this.responseFacebook = (response) => {
            if (response) {
                $.ajax({
                    url: "http://localhost:3000/api/login/facebook",
                    type: "POST",
                    data: {
                        email: response.email || '',
                        name: response.name,
                        displayPicture: response.picture.data.url,
                        facebookId: response.userID, 
                        accessToken: response.accessToken   
                    },
                    success: function(data) { 
                        window.location = '/#/loginRedirect?accessToken=' + data.jwt
                    }
                });
            }
        }
        // Load initial state
    }

    render() {

        FB.init({
          appId      : '1742206736042329', // App ID
          status     : false, 
          version:  'v2.0',
          cookie     : true, 
          xfbml      : false  // parse XFBML
        });

        return (<FacebookLogin
            appId="1742206736042329"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends,user_actions.books"
            cssClass="my-facebook-button-class"
            size="metro"
            icon={<FaFacebookSquare />}
            callback={this.responseFacebook}>
                <span style={{paddingLeft: "2px"}}> Login with Facebook </span>
            </FacebookLogin>)
    }
}
