import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'


const style = {
  margin: 12,
};

export default class Button extends React.Component {

    constructor() { 
    	super() 

    	this.handleClick = () => {
    		if (this.props.onClick) {
    			this.props.onClick();
    		}
    	}
    }

   	render() {
   		return ( <RaisedButton label={this.props.label} onClick={this.handleClick} primary={true} style={style} />)
   	}

}