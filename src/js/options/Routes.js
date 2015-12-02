'use strict';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';

let Routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
    </Route>
);

export default Routes;
