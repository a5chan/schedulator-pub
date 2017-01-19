import React from 'react';

export default class List extends React.Component {
    constructor() {
        super();

        this.state = {
            items: null
        };
    }

    render() {
        return (
            <ul>
                { this.state.items }
            </ul>
        );
    }
}