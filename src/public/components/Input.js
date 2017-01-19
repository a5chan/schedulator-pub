import React from 'react';
import $ from 'jquery';

export default class Input extends React.Component {
    onChange(evt) {
        this.value = evt.target.value;

        (this.props.onChange || (() => {}))(this.value);
    }

    reset() {
        $(this.input).val('');
    }

    render() {
        let icon = null;

        if (this.props.icon) {
            icon = <div class="form-control-feedback">
                <i class={ `icon-${ this.props.icon }` }></i>
            </div>;
        }

        return (
            <div class={ `form-group${ this.props.icon ? ' has-feedback has-feedback-left' : '' }` }>
				<input
                    type="text"
                    class="form-control"
                    placeholder={ this.props.placeholder }
                    onChange={ this.onChange.bind(this) }
                    ref={ (ref) => { this.input = ref; } }
                />
                { icon }
			</div>
        );
    }
}