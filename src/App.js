import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import ProductPage from './containers/ProductPage/ProductPage.js';
import LoginPage from './containers/LoginPage/LoginPage.js';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/shop" component={ProductPage} />
            <Route path="/" exact component={LoginPage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
