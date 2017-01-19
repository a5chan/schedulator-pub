import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

export default class ClickableMiniIcon extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			tipId: 'hasdaddsasdads'
		};
	}
	render() {
		return (
			<span>
				<a id="button" onClick={this.props.onClick}
					style={{fontSize:"10px", verticalAlign:"middle",color:""}}>
					  <i class="material-icons">add</i>
				</a>
				<ReactTooltip id={this.state.tipId}/>			
			</span>
		);
	};
}