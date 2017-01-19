import React from 'react';

import init from '../js/limitless-init-panel';

export default class Panel extends React.Component {
    render() {
        let header = null;
        let icon = null;

        if (this.props.header) {
            header = (
                <form class="heading-form" action='javascript:void(0)'>
                    <div class="form-group">
                        { this.props.header }
                    </div>
                </form>
            );
        }

        if (this.props.icon) {
            icon = <i className={ `position-left icon-${ this.props.icon }` }></i>
        }

        return (
            <div ref={ (ref) => { this.panel = ref; } }>
                <div class='panel panel-flat'>
                    <div class="panel-heading">
                        <h6 class="panel-title">
                            { icon }
                            { this.props.title }
                        </h6>
                        <div class="heading-elements">
                            { header }
                            <ul class="icons-list">
                                <li><a data-action="collapse"></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className={ `panel-body${ this.props.noPadding ? ' no-padding' : '' }` }>
                        { this.props.content }
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        init(this.panel);
        console.log("panel initialized");
    }
}