import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { MuiTheme } from "material-ui/styles";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Subheader from "material-ui/Subheader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ITwitter } from "../reducers/twitter";

export interface IProps {
    twitter: ITwitter;
}

export interface IState {
    muiTheme?: MuiTheme;
}

class Account extends React.Component<IProps, {}> {

    public componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

    public render() {
        const { twitter } = this.props;

        let content;
        if (!twitter.loaded) {
            content = <ListItem primaryText="Loading Account Info..." />;
        } else if (twitter.authorized) {
            content = (
                <ListItem
                    leftAvatar={<Avatar src={twitter.profileImageUrl} />}
                    primaryText={twitter.name}
                    secondaryText={twitter.screenName}
                />
            );
        } else {
            const style = {
                textAlign: "center",
            };
            content = (
                <ListItem style={style}>
            <RaisedButton label="Login to Twitter" primary={true} />
            </ListItem>
            );
        }
        return (
            <List>
                <Subheader>Account</Subheader>
                {content}
            </List>
        );
    }
}

export default Account;
