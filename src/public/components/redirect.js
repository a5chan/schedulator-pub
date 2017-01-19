import React from 'react';
import cookie from 'react-cookie'
import jwt_decode from 'jwt-decode';

export default class Redirect extends React.Component {

    render() {
        if (this.props.location.query) {
            let {accessToken, action}  = this.props.location.query;
            
            if (!action) {
                let decoded = jwt_decode(accessToken);
                
                if (decoded && decoded.user) {
                    let userId;
                    if (decoded.user.facebookId) {
                        cookie.save('user', decoded.facebookUser); 
                        userId = decoded.user._id;
                    } else if (decoded.user.googleUserID) {
                        cookie.save('user', decoded.googleUser);
                        userId = decoded.user._id;
                    } else {
                        cookie.save('user', decoded.user);
                        userId = decoded.user._id
                    }
                    cookie.save('accessToken', accessToken);
                    cookie.save('userId', userId)
                    window.location = '/';
                }
            } else {
                cookie.remove('accessToken');
                cookie.remove('userId');
                window.location = '/#/login'
            } 
        }
        return (<div></div>)
    }
}

