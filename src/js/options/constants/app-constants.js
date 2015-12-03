'use strict';

import keyMirror from 'fbjs/lib/keymirror';

const urlUpdate = 'https://api.twitter.com/1.1/statuses/update.json';
const urlConfig = 'https://api.twitter.com/1.1/help/configuration.json';
const urlDeveloper = 'https://twitter.com/yslibnet';
const urlChromeWebStore = 'https://chrome.google.com/webstore/detail/omnitweety/jkghejckpigfbolkdkplfokccgpjjilb';

const ActionTypes = keyMirror({
    AUTH_START: null,
    AUTH_CALLBACK: null,
    DEAUTH: null,

    // actions for twitter authorization
    SAVE_TOKEN: null,
    LOAD_TOKEN: null,

    // actions for load twitter config
    SAVE_CONFIG: null,
    LOAD_CONFIG: null,

    // actions for Slack integration
    SAVE_USE_SLACK: null,
    LOAD_USE_SLACK: null,
    SAVE_SLACK_TOKEN: null,
    LOAD_SLACK_TOKEN: null,
    SAVE_SLACK_USER: null,
    LOAD_SLACK_USER: null,
    SAVE_SLACK_ROOM: null,
    LOAD_SLACK_ROOM: null
});

const Values = {
    // keys for twitter authorization
    URL_UPDATE: urlUpdate,
    URL_CONFIG: urlConfig,
    OAUTH_SCOPE: `${urlUpdate},${urlConfig}`,

    URL_DEVELOPER: urlDeveloper,
    URL_WEBSTORE: urlChromeWebStore
}

export default {
    ActionTypes: ActionTypes,
    Values: Values
};
