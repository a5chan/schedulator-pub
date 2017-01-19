import React from 'react';

export default class Table extends React.Component {
    constructor() {
        super();

        this.state = {
            header: null,
            rows: null
        };
    }

    setRows(items) {
        const cols = this.props.columns;

        const rows = items.map((item, idx) => {
            const values = cols.map((col, _idx) => {
                return (<td key={ _idx }>
                    <span className={ item.color ? `text-${ item.color }` : '' }>{ item[col.key] }</span>
                </td>);
            });

            return (
                <tr key={ idx }>
                    { values }
                </tr>
            );
        });

        this.setState({ rows });
    }

    render() {
        const cols = this.props.columns;

        let header = null;

        if (cols) {
            header = cols.map((col, idx) => {
                return <th class='bg-primary' key={ idx }>{ col.name }</th>;
            });
        }

        return (
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            { header }
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.rows }
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        const items = this.props.items;

        if (items) {
            this.setRows(this.props.items);
        }
    }
}