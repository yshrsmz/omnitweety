declare const TWITTER_API_KEY: string;
declare const TWITTER_API_SECRET: string;

const urlUpdate = "https://api.twitter.com/1.1/statuses/update.json";
const urlConfig = "https://api.twitter.com/1.1/help/configuration.json";

export const AppConfig = {
    PREFIX: "NowBrowsing:",
    URL_DEVELOPER: "https://twitter.com/yslibnet",
    URL_CHROME_WEBSTORE: "https://chrome.google.com/webstore/detail/omnitweety/jkghejckpigfbolkdkplfokccgpjjilb",
};

export const TwitterConfig = {
    // for oauth
    URL_REQUEST_TOKEN: "https://api.twitter.com/oauth/request_token",
    URL_AUTHORIZE: "https://api.twitter.com/oauth/authorize",
    URL_ACCESS_TOKEN: "https://api.twitter.com/oauth/access_token",

    // for status update
    URL_STATUS_UPDATE: urlUpdate,
    URL_CONFIG: urlConfig,

    OAUTH_SCOPE: `$urlUpdate,$urlConfig`,

    STATUS_LENGTH: 280,

    // api keys
    API_KEY: TWITTER_API_KEY,
    API_SECRET: TWITTER_API_SECRET,
};
