import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import './custom.css'
import { Trips } from './components/Trips/Trips';
import { Create } from './components/Trips/Create';
import { Update } from './components/Trips/Update';
import { Delete } from './components/Trips/Delete';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>        
        <Route path='/create' component={Create} />        
        <Route path='/update/:id' component={Update} />
        <Route path='/delete/:id' component={Delete} />
        <Route path='/trips' component={Trips} />        
      </Layout>
    );
  }
}
