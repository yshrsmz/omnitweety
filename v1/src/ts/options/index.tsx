import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SettingIcon from "material-ui/svg-icons/action/settings";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import theme from "./theme";

injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider muiTheme={theme}>
        <div>
            <AppBar
                title="Omnitweety for Chrome"
                zDepth={0}
                iconElementLeft={<IconButton><SettingIcon /></IconButton>}
            />
            <RaisedButton primary={true} label="Default" />
        </div>
    </MuiThemeProvider>
);

ReactDOM.render(
    <App />,
    document.getElementById("app"),
);
