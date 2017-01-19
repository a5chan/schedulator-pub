import React from 'react';
import ReactDOM from 'react-dom';
import q from 'q';
import $ from 'jquery'; // This one doesn't have bootstrap stuff, so be careful.

import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import List from '../components/List';
import cookie from 'react-cookie'
import Request from 'react-http-request';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import init from '../js/limitless-init-layout';
import autoc from '../utils/autoc';

let currentCategory = null; // @todo Put this somewhere else.

export default class Layout extends React.Component {

    constructor() {
        super();
        this.state = { 
          // Should be loaded from server in the future
          categoryData: [{ 
            'name': 'League',
            'categoryList': []
          }]
        }
    }
    componentDidMount () {
        let _this = this;
        $.ajax({
         url: "http://localhost:3000/api/users/" + cookie.load('userId'),
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('Authorization', cookie.load('accessToken'));},
         success: function(data) { 
            _this.setState({userData: data})
         }
      });
    }

    render() {
        
      return (<Request
        url={"http://localhost:3000/api/users/" + cookie.load('userId')}
        method='get'
        headers={{'Authorization': cookie.load('accessToken')}}
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return (<div>loading...</div>);
            } else {
              return (<MuiThemeProvider>
                <div>
                    <Navbar/>
                    <Container userData={ this.state.userData } partials={this.props.children} categoryData={this.state.categoryData} />
                </div>
               </MuiThemeProvider>)
            }
          }
        }
      </Request>)
        
    }
}