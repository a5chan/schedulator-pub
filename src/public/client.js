import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import $ from 'jquery'; // This one doesn't have bootstrap stuff, so be careful.
import cookie from 'react-cookie';
import Layout from './views/Layout';
import Login from './views/Login';
import CategoryView from './views/CategoryView';
import SettingsView from './views/SettingsView';
import IntegrationsView from './views/IntegrationsView';
import SupportView from './views/SupportView';
import FaqView from './views/FaqView';


var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import Redirect from './components/redirect'

const history = useRouterHistory(createHashHistory)({ queryKey: false });
const app = document.getElementById('app');
const userPromise = $.get('/api/users/' + cookie.load('userId'));

class LayoutWrapper extends React.Component {
    render() {
        return <Layout serverRequest={userPromise} children={this.props.children}/>;
    }
}

function requireAuth(nextState, replaceState) {
    if (cookie.load('userId') && cookie.load('accessToken')) {
        replaceState({ nextPathname: nextState.location.pathname }, '/')
    } 
}

function isLoggedIn(nextState, replaceState) {
    if (!cookie.load('userId') && !cookie.load('accessToken')) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
    } 
}

ReactDOM.render(
    <Router history={ history }>
        <Route path='/' component={ LayoutWrapper } onEnter={isLoggedIn}>
            <Route path='category/:id' component={ CategoryView } />
            <Route path='settings' component={ SettingsView } />
            <Route path='integrations' component={ IntegrationsView } />
            <Route path='support' component={ SupportView }>
                <Route path='faq' component={ FaqView } />
            </Route>
        </Route>
        <Route path='/loginRedirect' component= { Redirect }>
        </Route>
        <Route path='/login' component={ Login } onEnter={requireAuth} >
        </Route>
    </Router>,
app);