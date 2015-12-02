'use strict';

import React from 'react';
import Router from 'react-router';
import {Mixins, RaisedButton, Styles} from 'material-ui';
import SettingIcon from 'material-ui/lib/svg-icons/action/settings';

import FullWidthSection from './full-width-section.js';

let {StylePropable, StyleResizable} = Mixins;
let {Colors, Spacing, Typography} = Styles;


let HomePage = React.createClass({
    mixins: [StylePropable, StyleResizable],

    contextTypes: {
        router: React.PropTypes.func
    },

    render() {
        let style = {
            paddingTop: Spacing.desktopKeylineIncrement
        };

        return (
            <div style={style}>
                test
                <SettingIcon/>
            </div>
        )
    }
});


export default HomePage;
