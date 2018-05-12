import { TwitterConfig, AppConfig } from '../Config';

const save = (key: string, value: string) => {
    localStorage[key] = value;
};

const load = (key: string): string => {
    return localStorage[key];
};

const clear = (key: string) => {
    delete localStorage[key];
};

class ConfigDataSource {

    private static readonly KEY_TWITTER_TOKEN = `oauth_token${encodeURI(TwitterConfig.OAUTH_SCOPE)}`;
    private static readonly KEY_TWITTER_SECRET = `oauth_token_secret${encodeURI(TwitterConfig.OAUTH_SCOPE)}`;
    private static readonly KEY_STATUS_PREFIX = 'status_prefix';
    private static readonly KEY_TWITTER_NAME = 'twitter_name';
    private static readonly KEY_TWITTER_SCREEN_NAME = 'twitter_screen_name';
    private static readonly KEY_TWITTER_THUMB_URL = 'twitter_thumb_url';

    public getAccessToken(): string {
        return load(ConfigDataSource.KEY_TWITTER_TOKEN);
    }

    public setAccessToken(token: string) {
        save(ConfigDataSource.KEY_TWITTER_TOKEN, token);
    }

    public clearAccessToken() {
        clear(ConfigDataSource.KEY_TWITTER_TOKEN);
    }

    public getAccessTokenSecret(): string {
        return load(ConfigDataSource.KEY_TWITTER_SECRET);
    }

    public setAccessTokenSecret(secret: string) {
        save(ConfigDataSource.KEY_TWITTER_SECRET, secret);
    }

    public clearAccesTokenSecret() {
        clear(ConfigDataSource.KEY_TWITTER_SECRET);
    }

    public getStatusPrefix(): string {
        const result: string = load(ConfigDataSource.KEY_STATUS_PREFIX);
        return result ? result : AppConfig.PREFIX;
    }

    public setStatusPrefix(prefix: string) {
        save(ConfigDataSource.KEY_STATUS_PREFIX, prefix);
    }

    public clearStatusPrefix() {
        clear(ConfigDataSource.KEY_STATUS_PREFIX);
    }

    public getTwitterName(): string {
        return load(ConfigDataSource.KEY_TWITTER_NAME) || '';
    }

    public setTwitterName(name: string) {
        save(ConfigDataSource.KEY_TWITTER_NAME, name);
    }

    public clearTwitterName() {
        clear(ConfigDataSource.KEY_TWITTER_NAME);
    }

    public getTwitterScreenName(): string {
        return load(ConfigDataSource.KEY_TWITTER_SCREEN_NAME) || '';
    }

    public setTwitterScreenName(screenName: string) {
        save(ConfigDataSource.KEY_TWITTER_SCREEN_NAME, screenName);
    }

    public clearTwitterScreenName() {
        clear(ConfigDataSource.KEY_TWITTER_SCREEN_NAME);
    }

    public getTwitterThumbUrl(): string {
        return load(ConfigDataSource.KEY_TWITTER_THUMB_URL) || '';
    }

    public setTwitterThumbUrl(thumbUrl: string) {
        save(ConfigDataSource.KEY_TWITTER_THUMB_URL, thumbUrl);
    }

    public clearTwitterThumbUrl() {
        clear(ConfigDataSource.KEY_TWITTER_THUMB_URL);
    }
}

export default new ConfigDataSource();
