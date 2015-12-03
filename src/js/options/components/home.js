'use strict';

import React from 'react';
import Router from 'react-router';
import {Mixins, RaisedButton, Styles, List, ListItem, Toggle, Paper, ListDivider, Dialog, TextField} from 'material-ui';
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
        slackRoom: ConfigStore.getSlackRoom(),
        openSlackTokenDialog: false,
        openSlackUserDialog: false,
        openSlackRoomDialog: false
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
        this.setState({openSlackTokenDialog: true});
    },

    _onSlackUserClicked() {
        this.setState({openSlackUserDialog: true});
    },

    _onSlackRoomClicked() {
        this.setState({openSlackRoomDialog: true});
    },

    _onSaveSlackToken() {
        let token = this.refs.slackTokenText.getValue();
        console.log('token:', token);

        ConfigActions.saveSlackToken(token);

        this._onRequestClose();
    },

    _onSaveSlackUser() {
        let user = this.refs.slackUserText.getValue();
        console.log('user:', user);

        ConfigActions.saveSlackUser(user);

        this._onRequestClose();
    },

    _onSaveSlackRoom() {
        let room = this.refs.slackRoomText.getValue();
        console.log('room:', room);

        ConfigActions.saveSlackRoom(room);

        this._onRequestClose();
    },

    _onRequestClose(buttonClicked) {
        this.setState({
            openSlackTokenDialog: false,
            openSlackUserDialog: false,
            openSlackRoomDialog: false
        });
    },

    render() {
        let style = {
            padding: Spacing.desktopGutter,
            paddingTop: Spacing.desktopKeylineIncrement + Spacing.desktopGutter
        };

        let slackTokenDialogActions = [
            {text: 'Cancel'},
            {text: 'Save', onTouchTap: this._onSaveSlackToken, ref: 'saveSlackToken'}
        ];

        let slackUserDialogActions = [
            {text: 'Cancel'},
            {text: 'Save', onTouchTap: this._onSaveSlackUser, ref: 'saveSlackUser'}
        ];

        let slackRoomDialogActions = [
            {text: 'Cancel'},
            {text: 'Save', onTouchTap: this._onSaveSlackRoom, ref: 'saveSlackRoom'}
        ];

        let hintSlackToken = 'Enter Slack access token';
        let hintSlackUser = 'Enter user name to use';
        let hintSlackRoom = 'Enter room name to post';

        let appVersion = `App Version: ${chrome.app.getDetails().version}`;
        let slackTokenSecondary = this.state.slackToken || hintSlackToken;
        let slackUserSecondary = this.state.slackUser || hintSlackUser;
        let slackRoomSecondary = this.state.slackRoom || hintSlackRoom;

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
                <Dialog
                    ref="slackTokenDialog"
                    title="Slack Access Token"
                    open={this.state.openSlackTokenDialog}
                    actions={slackTokenDialogActions}
                    onRequestClose={this._onRequestClose}>
                    <TextField
                        ref="slackTokenText"
                        hintText={hintSlackToken}
                        style={{width: '100%'}}
                        defaultValue={this.state.slackToken}/>
                </Dialog>
                <Dialog
                    ref="slackUserDialog"
                    title="Slack User"
                    open={this.state.openSlackUserDialog}
                    actions={slackUserDialogActions}
                    onRequestClose={this._onRequestClose}>
                    <TextField
                        ref="slackUserText"
                        hintText={hintSlackUser}
                        style={{width: '100%'}}
                        defaultValue={this.state.slackUser}/>
                </Dialog>
                <Dialog
                    ref="slackRoomDialog"
                    title="Slack Room"
                    open={this.state.openSlackRoomDialog}
                    actions={slackRoomDialogActions}
                    onRquestClose={this._onRequestClose}>
                    <TextField
                        ref="slackRoomText"
                        hintText={hintSlackRoom}
                        style={{width: '100%'}}
                        defaultValue={this.state.slackRoom}/>
                </Dialog>
            </div>
        )
    }
});


export default HomePage;
