'use strict';

import keyMirror from 'fbjs/lib/keymirror';

// twitter
const urlUpdate = 'https://api.twitter.com/1.1/statuses/update.json';
const urlConfig = 'https://api.twitter.com/1.1/help/configuration.json';
const urlRequestToken = 'https://api.twitter.com/oauth/request_token';
const urlAuthorize = 'https://api.twitter.com/oauth/authorize';
const urlAccessToken = 'https://api.twitter.com/oauth/access_token';

// slack
const urlSlackPostMessage = 'https://slack.com/api/chat.postMessage';

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

    // actions for general settings
    SAVE_STATUS_PREFIX: null,

    // actions for Slack integration
    SAVE_USE_SLACK: null,
    LOAD_USE_SLACK: null,
    SAVE_SLACK_TOKEN: null,
    LOAD_SLACK_TOKEN: null,
    SAVE_SLACK_ROOM: null,
    LOAD_SLACK_ROOM: null
});

const Values = {
    // twitter
    URL_UPDATE: urlUpdate,
    URL_CONFIG: urlConfig,
    URL_REQUEST_TOKEN: urlRequestToken,
    URL_AUTHORIZE: urlAuthorize,
    URL_ACCESS_TOKEN: urlAccessToken,
    OAUTH_SCOPE: `${urlUpdate},${urlConfig}`,

    // slack
    URL_SLACK_POST_MESSAGE: urlSlackPostMessage,

    URL_DEVELOPER: urlDeveloper,
    URL_WEBSTORE: urlChromeWebStore
}

export default {
    ActionTypes: ActionTypes,
    Values: Values
};
