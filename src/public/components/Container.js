import React from 'react';

import Content from '../components/Content';
import Sidebar from '../components/Sidebar';

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div class='page-container' style ={{"display": "absolute"}}>
                <div class='page-content'>
                    <Sidebar userData={ this.props.userData} categoryData={this.props.categoryData} />
                    <Content partials={this.props.partials} userData={ this.props.userData }/>
                </div>
            </div>
        );
    }
}