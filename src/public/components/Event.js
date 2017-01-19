import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

export default class Events extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log("should be meep"+this.props.name);
    return(
      <MenuItem primaryText={this.props.name}  
        rightIcon={<ArrowDropRight/>}
        menuItems={[
          <MenuItem primaryText={this.props.name}/>,
          <Divider/>,
          <MenuItem primaryText="From 10/04/16 - 11/04/16"/>,
          <MenuItem primaryText="Notifications: ON"/>,
          <MenuItem primaryText="Display Color"/>,
          <MenuItem primaryText="Repeat: Every week"/>
        ]}
      />
    );
  };
}