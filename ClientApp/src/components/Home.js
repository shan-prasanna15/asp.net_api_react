import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Trip Information</h1>
        <p>Manage your trip information here</p>
        <ul>
          <li> Add Trips</li>          
          <li> Update Trips</li>
          <li> Delete Trips</li>
          <li> Show all Trips</li>
        </ul>        
      </div>
    );
  }
}
