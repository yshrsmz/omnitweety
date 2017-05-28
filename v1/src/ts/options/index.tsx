import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import { MuiTheme } from "material-ui/styles";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SettingIcon from "material-ui/svg-icons/action/settings";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Store } from "react-redux";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import configureStore from "./configureStore";
import Home from "./home";
import theme from "./theme";
import saga from "./sagas";

injectTapEventPlugin();
const store = configureStore();
store.runSaga(saga);

interface IState {
    muiTheme: MuiTheme;
}

class App extends React.Component<{}, IState> {

    public componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

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
                            <Home />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
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
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app"),
);
