import React from 'react';
import GameCategoryList from './GameCategoryList';
import cookie from 'react-cookie';
import Request from 'react-http-request';

import init from '../js/limitless-init-layout';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        let displayPicture = '';

        if (this.props.userData) {
            displayPicture = this.props.userData.displayPicture || 'https://www.google.ca/imgres?imgurl=http%3A%2F%2Fvignette2.wikia.nocookie.net%2Fpusheenthecat%2Fimages%2F1%2F14%2FAboutpusheen.gif%2Frevision%2Flatest%3Fcb%3D20140728143155&imgrefurl=http%3A%2F%2Fpusheenthecat.wikia.com%2Fwiki%2FPusheen&docid=8NCvu-av3PlkPM&tbnid=y3UhgAyz08o0jM%3A&w=325&h=241&bih=746&biw=1434&ved=0ahUKEwjQhvPThcrPAhUBVz4KHTNjAe8QMwg4KAAwAA&iact=mrc&uact=8'
        }

        this.state = {
            categories: [],
            displayPicture: displayPicture
        };
    }

    componentWillReceiveProps(nextProps) {
 //   if (nextProps && nextProps.userData) {
       //     this.state.displayPicture = nextProps.userData.displayPicture
        //}
    }

    renderCategoryList () {
        return (<Request
        url={"http://localhost:3000/api/categories/" + cookie.load('userId')}
        method='get'
        headers={{'Authorization': cookie.load('accessToken')}}
        accept='application/json'
        verbose={true}>
        {
          ({error, result, loading}) => {
            if (loading) {
              return (<div>loading...</div>);
            } else if (error) {
              return <div>Error</div>
            } else {
              return (<GameCategoryList categories={result.body.data} />)
            }
          }
        }
      </Request>)
    }

    render() {
        if (this.props.userData && this.props.categoryData) {
            return (
    			<div class="sidebar sidebar-main full-height" ref={ (ref) => { this.sidebar = ref; } }>
    				<div class="sidebar-content">
    					<div class="sidebar-user-material">
    						<div class="category-content">
    							<div class="sidebar-user-material-content">
    								<a href="#"><img src={this.props.userData.displayPicture} class="img-circle img-responsive" alt="" /></a>
    								<h6 class='text-slate'>{this.props.userData.displayName}</h6>
    								<span class="text-size-small text-slate">gdskgosmgods, ON</span>
    							</div>
    							<div class="sidebar-user-material-menu">
    								<a href="#user-nav" data-toggle="collapse" class='text-slate'><span>My account</span> <i class="caret"></i></a>
    							</div>
    						</div>
    						<div class="navigation-wrapper collapse" id="user-nav">
    							<ul class="navigation">
    								<li><a href="#"><i class="icon-cog5"></i> <span>Account settings</span></a></li>
                                    { /* @todo Apply logout logic here. */ }
    								<li><a href="/logout"><i class="icon-switch2"></i> <span>Logout</span></a></li>
    							</ul>
    						</div>
    					</div>
    					<div class="sidebar-category sidebar-category-visible">
    						<div class="category-content no-padding">
    							<ul class="navigation navigation-main">
    								<li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main"></i></li>
    								<li class="active"><a href="#"><i class="icon-home4"></i> <span>Dashboard</span></a></li>
    							</ul>
    							
    						</div>
    					</div>
    				</div>
                    {this.renderCategoryList()}
    			</div>
            );
        } else {
            return (<div></div>)
        }
    }
}