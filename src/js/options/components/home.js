'use strict';

import React from 'react';
import Router from 'react-router';
import {Mixins, RaisedButton, Styles, List, ListItem, Toggle, Paper, ListDivider} from 'material-ui';
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
            padding: Spacing.desktopGutter,
            paddingTop: Spacing.desktopKeylineIncrement + Spacing.desktopGutter
        };

        return (
            <div style={style}>
                <Paper style={{margin:'auto', maxWidth:'600px'}}>
                    <List subheader="Slack Integration">
                        <ListItem primaryText="Use Slack Integration" rightToggle={<Toggle/>}/>
                        <ListItem primaryText="Slack Access Token" secondaryText="Enter slack access token"/>
                        <ListItem primaryText="Slack User Name" secondaryText="Enter user name to use"/>
                        <ListItem primaryText="Slack Room" secondaryText="Enter room name to post"/>
                    </List>
                    <ListDivider/>
                    <List subheader="Others">
                        <ListItem primaryText="App Version: 0.3.1"/>
                    </List>
                </Paper>
            </div>
        )
    }
});


export default HomePage;
