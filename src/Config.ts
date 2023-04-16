const URL_V2_UPDATE = 'https://api.twitter.com/2/tweets'

const AppConfig = {
  NAME: 'Omnitweety for Chrome',
  PREFIX: 'NowBrowsing:',
  DEVELOPER_NAME: '@yslibnet(yslibrary.net)',
  URL_DEVELOPER: 'https://twitter.com/yslibnet',
  URL_CHROME_WEBSTORE:
    'https://chrome.google.com/webstore/detail/omnitweety/jkghejckpigfbolkdkplfokccgpjjilb',
}

const TwitterConfig = {
  // for oauth
  URL_REQUEST_TOKEN: 'https://api.twitter.com/oauth/request_token',
  URL_AUTHORIZE: 'https://api.twitter.com/oauth/authorize',
  URL_ACCESS_TOKEN: 'https://api.twitter.com/oauth/access_token',

  // for status update
  URL_STATUS_UPDATE: URL_V2_UPDATE,

  STATUS_LENGTH: 280,
  URL_LENGTH: 23,

  // // api keys
  API_KEY: TWITTER_API_KEY,
  API_SECRET: TWITTER_API_SECRET,
}

export { AppConfig, TwitterConfig }
