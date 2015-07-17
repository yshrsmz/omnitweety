'use strict';

import React from 'react';
import Router, {Route, NotFoundRoute, DefaultRoute, Redirect } from 'react-router';

import App from './components/app';
import Home from './components/home';

let Routes = (
    <Route name="root" handler={App} path="/">
        <Route name="home" handler={Home}/>
        <DefaultRoute handler={Home}/>
    </Route>
);

export default Routes;
