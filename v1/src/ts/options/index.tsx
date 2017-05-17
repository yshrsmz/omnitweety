import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import { MuiTheme } from "material-ui/styles";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SettingIcon from "material-ui/svg-icons/action/settings";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import Home from "./home";
import theme from "./theme";

injectTapEventPlugin();

interface IState {
    muiTheme: MuiTheme;
}

class App extends React.Component<{}, IState> {

    public render() {

        const { prepareStyles } = this.state.muiTheme;
        const styles = prepareStyles(this.getStyles());

        return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <AppBar
                        title="Omnitweety for Chrome"
                        zDepth={0}
                        iconElementLeft={<IconButton><SettingIcon /></IconButton>}
                        style={styles.appBar}
                    />
                    <div style={styles.root}>
                        <div style={styles.content}>
                            <Home useSlack={false} prefix={"NowBrowsing"} slackRoom="" slackToken="" />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    private componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

    private getStyles() {
        const { spacing } = this.state.muiTheme;
        return {
            appBar: {
                position: "fixed",
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
            },
            root: {
                paddingTop: spacing.desktopKeylineIncrement,
                minHeight: 400,
            },
            content: {
                margin: spacing.desktopGutter,
            },
        };
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app"),
);
