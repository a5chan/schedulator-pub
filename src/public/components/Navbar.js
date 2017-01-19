import React from 'react';

export default class Layout extends React.Component {
        
    render() {
        return (
        	<div class="navbar navbar-default header-highlight">
        		<div class="navbar-header">
        			<a class="navbar-brand" href="/"><img src="images/logo_icon_light.png" alt="" /></a>

        			<ul class="nav navbar-nav visible-xs-block">
        				<li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
        				<li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        			</ul>
        		</div>

        		<div class="navbar-collapse collapse" id="navbar-mobile">
        			<ul class="nav navbar-nav">
        				<li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>

        				<li class="dropdown">
        					<a href="#" class="dropdown-toggle text-orange" data-toggle="dropdown">
        						<i class="icon-bell2"></i>
        						<span class="visible-xs-inline-block position-right">Notifications</span>
        					</a>

        					<div class="dropdown-menu dropdown-content">
        						<div class="dropdown-content-heading">
        							Notifications
        							<ul class="icons-list">
        								<li><a href="#"><i class="icon-sync"></i></a></li>
        							</ul>
        						</div>

        						<ul class="media-list dropdown-content-body width-350">
        							<li class="media">
        								<div class="media-left">
        									<a href="#" class="btn border-primary text-primary btn-flat btn-rounded btn-icon btn-sm"><i class="icon-git-pull-request"></i></a>
        								</div>

        								<div class="media-body">
        									Notification test...
        									<div class="media-annotation">3 minutes ago</div>
        								</div>
        							</li>
                                </ul>
        					</div>
        				</li>
        			</ul>

        			<div class="navbar-right">
        				<p class="navbar-text"><span class="label bg-primary">Online</span></p>

        				<ul class="nav navbar-nav">
        					<li class="dropdown">
        						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
        							<i class="icon-cog"></i>
                                    
        							<span class="visible-xs-inline-block position-right">Allen Chan</span>
        						</a>

        						<div class="dropdown-menu dropdown-content width-350 linkText">
                                    <a href="#/settings">
            							<div class="dropdown-content-heading content-divider menuItem">
                                           Account Settings
                                        </div>
                                    </a>
                                    <a href="#/integrations">
                                        <div class="dropdown-content-heading content-divider menuItem">
                                           Integrations
                                        </div>
                                    </a>
                                    <a href="#/support">
                                        <div class="dropdown-content-heading content-divider menuItem">
                                           Support
                                        </div>
                                    </a>
                                    <a href="logout">
                                        <div class="dropdown-content-heading content-divider menuItem">
                                           Log Out
                                        </div>
                                    </a>
        						</div>
        					</li>
        				</ul>
        			</div>
        		</div>
        	</div>
        );
    }
}