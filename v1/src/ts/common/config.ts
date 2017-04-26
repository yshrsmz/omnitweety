declare const API_KEY: string;
declare const API_SECRET: string;

const urlUpdate = "https://api.twitter.com/1.1/statuses/update.json";
const urlConfig = "https://api.twitter.com/1.1/help/configuration.json";

export const AppConfig = {
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

    // api keys
    API_KEY: API_KEY,
    API_SECRET: API_SECRET,
};

export const SlackConfig = {
    URL_POST_MESSAGE: "https://slack.com/api/chat.postMessage",
};
