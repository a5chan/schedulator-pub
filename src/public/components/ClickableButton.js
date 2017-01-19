import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

export default class ClickableButton extends Component {
	constructor() {
		super()
	}
	render() {
		return (
			<span>
				<a onClick={this.props.onClick}
					style={{fontSize:"10px", verticalAlign:"middle",color:""}}>
					  <i class="material-icons">{this.props.iconName}</i>
				</a>
				<ReactTooltip id={this.props.tipId}/>			
			</span>
		);
	};
}