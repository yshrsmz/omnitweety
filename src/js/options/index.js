'use strict';

import React from 'react';
import Router from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes';

if (typeof window !== 'undefined') {
    window.React = React;
}

injectTapEventPlugin();

Router.run(Routes, (Handler) => {
    React.render(<Handler/>, document.getElementById('jsi-main'));
});
