const urlUpdate = 'https://api.twitter.com/1.1/statuses/update.json';
const urlConfig = 'https://api.twitter.com/1.1/help/configuration.json';

const AppConfig = {
    NAME: 'Omnitweety for Chrome',
    PREFIX: 'NowBrowsing:',
    URL_DEVELOPER: 'https://twitter.com/yslibnet',
    URL_CHROME_WEBSTORE: 'https://chrome.google.com/webstore/detail/omnitweety/jkghejckpigfbolkdkplfokccgpjjilb',
};

const TwitterConfig = {
    // for oauth
    URL_REQUEST_TOKEN: 'https://api.twitter.com/oauth/request_token',
    URL_AUTHORIZE: 'https://api.twitter.com/oauth/authorize',
    URL_ACCESS_TOKEN: 'https://api.twitter.com/oauth/access_token',

    // for status update
    URL_STATUS_UPDATE: urlUpdate,
    URL_CONFIG: urlConfig,

    OAUTH_SCOPE: '$urlUpdate,$urlConfig',

    STATUS_LENGTH: 280,

    // api keys
    API_KEY: TWITTER_API_KEY,
    API_SECRET: TWITTER_API_SECRET,
};

export { AppConfig, TwitterConfig };
