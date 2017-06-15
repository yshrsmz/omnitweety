import { TwitterConfig } from "../common/config";

const save = (key: string, value: string | boolean) => {
    localStorage[key] = value;
};

const load = (key: string) => {
    return localStorage[key];
};

const clear = (key: string) => {
    delete localStorage[key];
};

class ConfigDataStore {

    private static readonly KEY_TWITTER_TOKEN = `oauth_token${encodeURI(TwitterConfig.OAUTH_SCOPE)}`;
    private static readonly KEY_TWITTER_SECRET = `oauth_token_secret${encodeURI(TwitterConfig.OAUTH_SCOPE)}`;
    private static readonly KEY_STATUS_PREFIX = "status_prefix";
    private static readonly KEY_USE_SLACK = "slack_use";
    private static readonly KEY_SLACK_TOKEN = "slack_token";
    private static readonly KEY_SLACK_ROOM = "slack_room";
    private static readonly KEY_TWITTER_NAME = "twitter_name";
    private static readonly KEY_TWITTER_SCREEN_NAME = "twitter_screen_name";
    private static readonly KEY_TWITTER_THUMB_URL = "twitter_thumb_url";

    public getAccessToken(): string {
        return load(ConfigDataStore.KEY_TWITTER_TOKEN);
    }

    public setAccessToken(token: string) {
        save(ConfigDataStore.KEY_TWITTER_TOKEN, token);
    }

    public clearAccessToken() {
        clear(ConfigDataStore.KEY_TWITTER_TOKEN);
    }

    public getAccessTokenSecret(): string {
        return load(ConfigDataStore.KEY_TWITTER_SECRET);
    }

    public setAccessTokenSecret(secret: string) {
        save(ConfigDataStore.KEY_TWITTER_SECRET, secret);
    }

    public clearAccesTokenSecret() {
        clear(ConfigDataStore.KEY_TWITTER_SECRET);
    }

    public getStatusPrefix(): string {
        const result: string = load(ConfigDataStore.KEY_STATUS_PREFIX);
        return result ? result : "NowBrowsing:";
    }

    public setStatusPrefix(prefix: string) {
        save(ConfigDataStore.KEY_STATUS_PREFIX, prefix);
    }

    public useSlack(): boolean {
        const result = load(ConfigDataStore.KEY_USE_SLACK);
        if (result) {
            return JSON.parse(result);
        } else {
            return false;
        }
    }

    public setUseSlack(useSlack: boolean) {
        save(ConfigDataStore.KEY_USE_SLACK, useSlack);
    }

    public getSlackToken(): string {
        return load(ConfigDataStore.KEY_SLACK_TOKEN) || "";
    }

    public setSlackToken(token: string) {
        save(ConfigDataStore.KEY_SLACK_TOKEN, token) || "";
    }

    public getSlackRoom(): string {
        return load(ConfigDataStore.KEY_SLACK_ROOM) || "";
    }

    public setSlackRoom(room: string) {
        save(ConfigDataStore.KEY_SLACK_ROOM, room);
    }

    public getTwitterName(): string {
        return load(ConfigDataStore.KEY_TWITTER_NAME) || "";
    }

    public setTwitterName(name: string) {
        save(ConfigDataStore.KEY_TWITTER_NAME, name);
    }

    public clearTwitterName() {
        clear(ConfigDataStore.KEY_TWITTER_NAME);
    }

    public getTwitterScreenName(): string {
        return load(ConfigDataStore.KEY_TWITTER_SCREEN_NAME) || "";
    }

    public setTwitterScreenName(screenName: string) {
        save(ConfigDataStore.KEY_TWITTER_SCREEN_NAME, screenName);
    }

    public clearTwitterScreenName() {
        clear(ConfigDataStore.KEY_TWITTER_SCREEN_NAME);
    }

    public getTwitterThumbUrl(): string {
        return load(ConfigDataStore.KEY_TWITTER_THUMB_URL) || "";
    }

    public setTwitterThumbUrl(thumbUrl: string) {
        save(ConfigDataStore.KEY_TWITTER_THUMB_URL, thumbUrl);
    }

    public clearTwitterThumbUrl() {
        clear(ConfigDataStore.KEY_TWITTER_THUMB_URL);
    }
}

export default new ConfigDataStore();
