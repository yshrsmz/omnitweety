'use strict';

import React from 'react';
import Router from 'react-router';
import {Mixins, RaisedButton, Styles, List, ListItem, Toggle, Paper, ListDivider, Dialog, TextField} from 'material-ui';
import SettingIcon from 'material-ui/lib/svg-icons/action/settings';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'

import FullWidthSection from './full-width-section.js';
import ConfigStore from '../stores/config-store';
import ConfigActions from '../actions/config-actions';
import AppConstants from '../constants/app-constants';

let {StylePropable, StyleResizable} = Mixins;
let {Colors, Spacing, Typography} = Styles;
let {Values} = AppConstants;

let getConfigState = () => {
    return {
        statusPrefix: ConfigStore.getStatusPrefix(),
        useSlack: ConfigStore.useSlack(),
        slackToken: ConfigStore.getSlackToken(),
        slackRoom: ConfigStore.getSlackRoom(),
        openStatusPrefixDialog: false,
        openSlackTokenDialog: false,
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

    _onStatusPrefixClicked() {
        this.setState({openStatusPrefixDialog: true});
    },

    _onUseSlackToggled(event, checked) {
        console.log(checked);
        ConfigActions.saveSlackUseSlack(checked);
    },

    _onSlackAccessTokenClicked() {
        this.setState({openSlackTokenDialog: true});
    },

    _onSlackRoomClicked() {
        this.setState({openSlackRoomDialog: true});
    },

    _onSaveStatusPrefix() {
        let prefix = this.refs.statusPrefixText.getValue();
        console.log('prefix:', prefix);

        ConfigActions.saveStatusPrefix(prefix);

        this._onRequestClose();
    },

    _onSaveSlackToken() {
        let token = this.refs.slackTokenText.getValue();
        console.log('token:', token);

        ConfigActions.saveSlackToken(token);

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
            openStatusPrefixDialog: false,
            openSlackTokenDialog: false,
            openSlackRoomDialog: false
        });
    },

    render() {
        let style = {
            padding: Spacing.desktopGutter,
            paddingTop: Spacing.desktopKeylineIncrement + Spacing.desktopGutter
        };

        let statusPrefixDialogActions = [
            {text: 'Cancel'},
            {text: 'Save', onTouchTap: this._onSaveStatusPrefix, ref: 'saveStatusPrefix'}
        ];

        let slackTokenDialogActions = [
            {text: 'Cancel'},
            {text: 'Save', onTouchTap: this._onSaveSlackToken, ref: 'saveSlackToken'}
        ];

        let slackRoomDialogActions = [
            {text: 'Cancel'},
            {text: 'Save', onTouchTap: this._onSaveSlackRoom, ref: 'saveSlackRoom'}
        ];

        let slackDisabledListItemStyle = this.state.useSlack
            ? {}
            : {backgroundColor: ColorManipulator.fade(Colors.darkBlack, 0.05)};

        let hintSlackToken = 'Enter Slack access token';
        let hintSlackRoom = 'Enter room name to post';

        let appVersion = `App Version: ${chrome.app.getDetails().version}`;
        let slackTokenSecondary = this.state.slackToken || hintSlackToken;
        let slackRoomSecondary = this.state.slackRoom || hintSlackRoom;

        return (
            <div style={style}>
                <Paper style={{margin:'auto', maxWidth:'600px'}}>
                    <List subheader="General">
                        <ListItem primaryText="Status Prefix"
                            secondaryText={this.state.statusPrefix}
                            onClick={this._onStatusPrefixClicked}/>
                    </List>
                    <ListDivider/>
                    <List subheader="Slack Integration">
                        <ListItem primaryText="Use Slack Integration"
                            rightToggle={
                                <Toggle defaultToggled={this.state.useSlack}
                                    onToggle={this._onUseSlackToggled}/>
                            }/>
                        <ListItem primaryText="Slack Access Token"
                            secondaryText={slackTokenSecondary}
                            onClick={this._onSlackAccessTokenClicked}
                            disabled={!this.state.useSlack}
                            style={slackDisabledListItemStyle}/>
                        <ListItem primaryText="Slack Room"
                            secondaryText={slackRoomSecondary}
                            onClick={this._onSlackRoomClicked}
                            disabled={!this.state.useSlack}
                            style={slackDisabledListItemStyle}/>
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
                    ref="statusPrefixDialog"
                    title="Status Prefix"
                    open={this.state.openStatusPrefixDialog}
                    actions={statusPrefixDialogActions}
                    onRequestClose={this._onRequestClose}>
                    <TextField
                        ref="statusPrefixText"
                        style={{width: '100%'}}
                        defaultValue={this.state.statusPrefix}/>
                </Dialog>
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
