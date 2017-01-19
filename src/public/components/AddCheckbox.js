import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import Checkbox from 'material-ui/Checkbox';

export default class AddCheckbox extends Component {
	constructor() {
		super();
		this.state = {}

		this.handleClick = (event) =>{
			if(this.props.onClick){
				console.log(!this.props.isChecked);
				this.props.onClick(!this.props.isChecked);
			}
		}
	}



	render() {
		return (
			<Checkbox
			onClick = {this.handleClick}
			label = {this.props.label}
			checked={this.props.isChecked}
			labelStyle = {this.props.labelStyle}
			/>
		);
	};
}