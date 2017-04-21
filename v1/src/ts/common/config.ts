import ApiKey from "../../../apikey";


export const AppConfig = {
    URL_DEVELOPER: "https://twitter.com/yslibnet",
    URL_CHROME_WEBSTORE: "https://chrome.google.com/webstore/detail/omnitweety/jkghejckpigfbolkdkplfokccgpjjilb",
}

export const TwitterConfig = {
    // for oauth
    URL_REQUEST_TOKEN: "https://api.twitter.com/oauth/request_token",
    URL_AUTHORIZE: "https://api.twitter.com/oauth/authorize",
    URL_ACCESS_TOKEN: "https://api.twitter.com/oauth/access_token",

    // for status update
    URL_STATUS_UPDATE: "https://api.twitter.com/1.1/statuses/update.json",
    URL_CONFIG: "https://api.twitter.com/1.1/help/configuration.json",

    // api keys
    API_KEY: ApiKey.consumer_key,
    API_SECRET: ApiKey.consumer_secret,
}

export const SlackConfig = {
    URL_POST_MESSAGE: "https://slack.com/api/chat.postMessage"
}
