import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SettingIcon from "material-ui/svg-icons/action/settings";
import { MuiTheme } from "material-ui/styles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import theme from "./theme";

injectTapEventPlugin();

interface IState {
    muiTheme: MuiTheme;
}

class App extends React.Component<{}, IState> {

    componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

    getStyles() {
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
        }
    }

    render() {

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
                            <RaisedButton primary={true} label="Default" />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app"),
);
