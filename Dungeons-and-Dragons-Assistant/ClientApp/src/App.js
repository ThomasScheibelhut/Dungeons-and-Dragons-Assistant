import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';

import './custom.css'

export const App = () => {

    return (
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
    );
}
