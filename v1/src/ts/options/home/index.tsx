import * as React from "react";
import * as ReactDOM from "react-dom";
import Paper from "material-ui/Paper";
import { MuiTheme } from "material-ui/styles";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Toggle from "material-ui/Toggle";
import { fade } from "material-ui/utils/colorManipulator";
import { darkBlack } from "material-ui/styles/colors";

interface IState {
    muiTheme: MuiTheme;
}

interface IProps {
    prefix: string;
    useSlack: boolean;
    slackToken: string;
    slackRoom: string;
}

class Home extends React.Component<IProps, IState> {

    componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

    getStyles() {

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

    render() {
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
                    <ListItem primaryText="Status Prefix"
                        secondaryText={this.props.prefix} />
                </List>
                <Divider />
                <List>
                    <Subheader>Slack Integration</Subheader>
                    <ListItem primaryText="Use Slack Inegration"
                        rightToggle={<Toggle defaultToggled={this.props.useSlack} />} />
                    <ListItem primaryText="Slack Access Token"
                        secondaryText={slackTokenSecondary}
                        disabled={!useSlack}
                        style={useSlack ? {} : styles.disabledListItem} />
                    <ListItem primaryText="Slack Room"
                        secondaryText={slackRoomSecondary}
                        disabled={!useSlack}
                        style={useSlack ? {} : styles.disabledListItem} />
                </List>
                <Divider />
                <List>
                    <Subheader>Others</Subheader>
                    <ListItem primaryText={appVersion} />
                    <ListItem href=""
                        target="_blank"
                        primaryText="Developer"
                        secondaryText={<p>@yslibnet(yslibrary.net)</p>} />
                    <ListItem href=""
                        target="_blank"
                        primaryText="Rate on Chrome Web Store" />
                </List>
            </Paper>
        );
    }
}

export default Home;
