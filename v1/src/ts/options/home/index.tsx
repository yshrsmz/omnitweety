import Dialog from "material-ui/Dialog";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import { MuiTheme } from "material-ui/styles";
import { darkBlack } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";
import { fade } from "material-ui/utils/colorManipulator";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppConfig } from "../../common/config";

interface IState {
    muiTheme?: MuiTheme;
    prefixInput: string;
    slackTokenInput: string;
    slackRoomInput: string;
    openStatusPrefixDialog: boolean;
    openSlackTokenDialog: boolean;
    openSlackRoomDialog: boolean;
}

interface IProps {
    prefix: string;
    useSlack: boolean;
    slackToken: string;
    slackRoom: string;
}

class Home extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            prefixInput: "",
            slackTokenInput: "",
            slackRoomInput: "",
            openStatusPrefixDialog: false,
            openSlackTokenDialog: false,
            openSlackRoomDialog: false,
        };
    }

    public render() {
        const useSlack = this.props.useSlack;

        const { prepareStyles } = this.state.muiTheme;
        const styles = prepareStyles(this.getStyles());

        const hintSlackToken = "Enter Slack access token";
        const hintSlackRoom = "Enter room name to post";

        const slackTokenSecondary = this.props.slackToken || hintSlackToken;
        const slackRoomSecondary = this.props.slackRoom || hintSlackRoom;
        const appVersion = `App Version: ${chrome.runtime.getManifest().version}`;

        return (
            <Paper style={styles.content}>
                <List>
                    <Subheader>General</Subheader>
                    <ListItem
                        primaryText="Status Prefix"
                        secondaryText={this.props.prefix}
                        onClick={this.onOpenPrefixDialog}
                    />
                </List>
                <Divider />
                <List>
                    <Subheader>Slack Integration</Subheader>
                    <ListItem
                        primaryText="Use Slack Inegration"
                        rightToggle={
                            <Toggle
                                defaultToggled={this.props.useSlack}
                            />}
                    />
                    <ListItem
                        primaryText="Slack Access Token"
                        secondaryText={slackTokenSecondary}
                        disabled={!useSlack}
                        style={useSlack ? {} : styles.disabledListItem}
                    />
                    <ListItem
                        primaryText="Slack Room"
                        secondaryText={slackRoomSecondary}
                        disabled={!useSlack}
                        style={useSlack ? {} : styles.disabledListItem}
                    />
                </List>
                <Divider />
                <List>
                    <Subheader>Others</Subheader>
                    <ListItem primaryText={appVersion} />
                    <ListItem
                        href={AppConfig.URL_DEVELOPER}
                        target="_blank"
                        primaryText="Developer"
                        secondaryText={<p>@yslibnet(yslibrary.net)</p>}
                    />
                    <ListItem
                        href={AppConfig.URL_CHROME_WEBSTORE}
                        target="_blank"
                        primaryText="Rate on Chrome Web Store"
                    />
                </List>
                {this.getPrefixDialog()}
                {this.getSlackTokenDialog()}
            </Paper>
        );
    }

    private componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

    private getStyles() {

        return {
            content: {
                margin: "auto",
                maxWidth: 600,
            },
            disabledListItem: {
                backgroundColor: fade(darkBlack, 0.05),
            },
        };
    }

    private onUseSlackToggleChanged = (event: any, checked: boolean) => {
        // TODO dispatch action to update props
    }

    private getPrefixDialog() {
        const actions = [
            <FlatButton label="Cancel" onTouchTap={this.onClosePrefixDialog} />,
            <FlatButton label="Save" primary={true} onTouchTap={this.onSavePrefix} />,
        ];
        return (
            <Dialog
                title="Status prefix"
                actions={actions}
                modal={false}
                open={this.state.openStatusPrefixDialog}
                onRequestClose={this.onClosePrefixDialog}>
                <TextField
                    id="statusPrefixInput"
                    style={{ width: "100%" }}
                    defaultValue={this.props.prefix}
                    onChange={this.onPrefixChange}
                />
            </Dialog>
        );
    }

    private onPrefixChange = (event: any, newValue: string) => {
        this.setState({ prefixInput: newValue });
    }

    private onSavePrefix = () => {
        console.log(this.state.prefixInput);
        this.onClosePrefixDialog();
    }

    private onOpenPrefixDialog = () => {
        this.setState({ openStatusPrefixDialog: true });
    }

    private onClosePrefixDialog = () => {
        this.setState({ openStatusPrefixDialog: false });
    }

    private getSlackTokenDialog() {
        const actions = [
            <FlatButton label="Cancel" onTouchTap={this.onCloseSlackTokenDialog} />,
            <FlatButton label="Save" primary={true} onTouchTap={this.onSaveSlackToken} />,
        ];
        return (
            <Dialog
                title="Slack Access Token"
                actions={actions}
                modal={false}
                open={this.state.openSlackTokenDialog}
                onRequestClose={this.onCloseSlackTokenDialog}>
                <TextField
                    id="slackTokenInput"
                    style={{ width: "100%" }}
                    defaultValue={this.props.slackToken}
                    onChange={this.onSlackTokenChange}
                />
            </Dialog>
        );
    }

    private onSlackTokenChange = (event: any, newValue: string) => {
        this.setState({ slackTokenInput: newValue.trim() });
    }

    private onSaveSlackToken = () => {
        console.log(this.state.slackTokenInput);
        this.onCloseSlackTokenDialog();
    }

    private openSlackTokenDialog = () => {
        this.setState({ openSlackTokenDialog: true });
    }

    private onCloseSlackTokenDialog = () => {
        this.setState({ openSlackTokenDialog: false });
    }

    private getSlackRoomDialog() {
        const actions = [
            <FlatButton label="Cancel" onTouchTap={this.onCloseSlackRoomDialog} />,
            <FlatButton label="Save" primary={true} onTouchTap={this.onSaveSlackRoom} />,
        ];
        return (
            <Dialog
                title="Slack Room"
                actions={actions}
                modal={false}
                open={this.state.openSlackRoomDialog}
                onRequestClose={this.onCloseSlackRoomDialog}>
                <TextField
                    id="slackRoomInput"
                    style={{ width: "100%" }}
                    defaultValue={this.props.slackRoom}
                    onChange={this.onSlackRoomChange}
                />
            </Dialog>
        );
    }

    private onSlackRoomChange = (event: any, newValue: string) => {
        this.setState({ slackRoomInput: newValue.trim() });
    }

    private onSaveSlackRoom = () => {
        console.log(this.state.slackTokenInput);
        this.onCloseSlackRoomDialog();
    }

    private openSlackRoomDialog = () => {
        this.setState({ openSlackRoomDialog: true });
    }

    private onCloseSlackRoomDialog = () => {
        this.setState({ openSlackRoomDialog: false });
    }
}

export default Home;
