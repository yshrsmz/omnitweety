'use strict';

import keyMirror from 'keymirror';

const urlUpdate = 'https://api.twitter.com/1.1/statuses/update.json';
const urlConfig = 'https://api.twitter.com/1.1/help/configuration.json';

const AppConstants = keyMirror({
    AUTH_START: null,
    AUTH_CALLBACK: null,
    DEAUTH: null,


    SAVE_TOKEN: null,
    LOAD_TOKEN: null,
    SAVE_CONFIG: null,
    LOAD_CONFIG: null,

    URL_UPDATE: urlUpdate,
    URL_CONFIG: urlConfig,
    OAUTH_SCOPE: `${urlUpdate},${urlConfig}`
});

export default AppConstants;
