'use strict';

import React from 'react';
import { AppCanvas, AppBar, IconButton, Styles }from 'material-ui';
import SettingIcon from 'material-ui/lib/svg-icons/action/settings';
import AppTheme from '../app-theme';

import FullWidthSection from './full-width-section';

let ThemeManager = Styles.ThemeManager;
let {Colors, Typography} = Styles;

class App extends React.Component {
    constructor() {
        super();
    }

    static get childContextTypes() {
        return {
            muiTheme: React.PropTypes.object
        };
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(AppTheme)
        };
    }

    getStyles() {
        let darkWhite = Colors.darkWhite;
        return {
            footer: {
                backgroundColor: Colors.grey900,
                textAlign: 'center'
            },
            a: {
                color: darkWhite
            },
            p: {
                margin: '0 auto',
                padding: '0',
                color: Colors.lightWhite,
                maxWidth: '335px'
            },
            iconButton: {
                color: darkWhite
            }
        }
    }

    render() {
        let styles = this.getStyles();

        let githubButton = (
            <IconButton
                iconStyle={styles.iconButton}
                iconClassName="muidocs-icon-custom-github"
                href="https://github.com/yshrsmz/omnitweety"
                target="_blank"
                linkButton={true}/>
        );

        return (
            <AppCanvas>
                <AppBar
                    title="Omnitweety for Chrome"
                    zDepth={0}
                    iconElementLeft={<IconButton><SettingIcon/></IconButton>}/>

                {this.props.children}

                <FullWidthSection style={styles.footer}>
                    <p style={styles.p}>
                        Created by Yasuhiro Shimizu at <a href="http://yslibrary.net" target="_blank">Ys' Library</a>.
                    </p>
                    {githubButton}
                </FullWidthSection>
            </AppCanvas>
        )
    }
}

export default App;