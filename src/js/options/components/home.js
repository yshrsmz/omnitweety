'use strict';

import React from 'react';
import Router from 'react-router';
import {Mixins, RaisedButton, Styles, List, ListItem, Toggle, Paper, ListDivider} from 'material-ui';
import SettingIcon from 'material-ui/lib/svg-icons/action/settings';

import FullWidthSection from './full-width-section.js';
import ConfigStore from '../stores/config-store';
import ConfigActions from '../actions/config-actions';
import AppConstants from '../constants/app-constants';

let {StylePropable, StyleResizable} = Mixins;
let {Colors, Spacing, Typography} = Styles;
let {Values} = AppConstants;

let getConfigState = () => {
    return {
        useSlack: ConfigStore.useSlack(),
        slackToken: ConfigStore.getSlackToken(),
        slackUser: ConfigStore.getSlackUser(),
        slackRoom: ConfigStore.getSlackRoom()
    };
}

let HomePage = React.createClass({
    mixins: [StylePropable, StyleResizable],

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState() {
        return getConfigState();
    },

    componentDidMount() {
        ConfigStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        ConfigStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        console.log('onChange');
        this.setState(getConfigState());
    },

    _onUseSlackToggled(event, checked) {
        console.log(checked);
        ConfigActions.saveSlackUseSlack(checked);
    },

    _onSlackAccessTokenClicked() {

    },

    _onSlackUserClicked() {

    },

    _onSlackRoomClicked() {

    },

    render() {
        let style = {
            padding: Spacing.desktopGutter,
            paddingTop: Spacing.desktopKeylineIncrement + Spacing.desktopGutter
        };

        let appVersion = `App Version: ${chrome.app.getDetails().version}`;
        let slackTokenSecondary = this.state.slackToken || 'Enter slack access token';
        let slackUserSecondary = this.state.slackUser || 'Enter user name to use';
        let slackRoomSecondary = this.state.slackRoom || 'Enter room name to post';

        return (
            <div style={style}>
                <Paper style={{margin:'auto', maxWidth:'600px'}}>
                    <List subheader="Slack Integration">
                        <ListItem primaryText="Use Slack Integration"
                            rightToggle={
                                <Toggle defaultToggled={this.state.useSlack}
                                    onToggle={this._onUseSlackToggled}/>
                            }/>
                        <ListItem primaryText="Slack Access Token"
                            secondaryText={slackTokenSecondary}
                            onClick={this._onSlackAccessTokenClicked}/>
                        <ListItem primaryText="Slack User Name"
                            secondaryText={slackUserSecondary}
                            onClick={this._onSlackUserClicked}/>
                        <ListItem primaryText="Slack Room"
                            secondaryText={slackRoomSecondary}
                            onClick={this._onSlackRoomClicked}/>
                    </List>
                    <ListDivider/>
                    <List subheader="Others">
                        <ListItem primaryText={appVersion}/>
                        <ListItem
                            href={Values.URL_DEVELOPER}
                            target="_blank"
                            primaryText="Developer"
                            secondaryText={
                                <p>@yslibnet (yslibrary.net)</p>
                            }/>
                        <ListItem
                            href={Values.URL_WEBSTORE}
                            target="_blank"
                            primaryText="Rate on Chrome Web Store"/>
                    </List>
                </Paper>
            </div>
        )
    }
});


export default HomePage;
