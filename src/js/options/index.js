'use strict';

import React from 'react';
import ReactDOM from 'react-dom'
import {Router} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes';
import AppConstants from './constants/app-constants';
import createHashHistory from 'history/lib/createHashHistory';

if (typeof window !== 'undefined') {
    window.React = React;
}

console.log(AppConstants.USE_SLACK, AppConstants.SLACK_USER);

injectTapEventPlugin();

ReactDOM.render(
    <Router history={createHashHistory()}>{Routes}</Router>,
    document.getElementById('jsi-main'));
