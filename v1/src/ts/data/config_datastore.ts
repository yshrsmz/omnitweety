import { TwitterConfig } from "../common/config";

let save = function(key: string, value: string|boolean) {
    localStorage[key] = value;
};

let load = function(key: string) {
    return localStorage[key];
};

let clear = function(key: string) {
    delete localStorage[key];
};

class ConfigDataStore {

    private static readonly KEY_TWITTER_TOKEN = `oauth_token${encodeURI(TwitterConfig.OAUTH_SCOPE)}`;
    private static readonly KEY_TWITTER_SECRET = `oauth_token_secret${encodeURI(TwitterConfig.OAUTH_SCOPE)}`;
    private static readonly KEY_STATUS_PREFIX = "status_prefix";
    private static readonly KEY_USE_SLACK = "slack_use";
    private static readonly KEY_SLACK_TOKEN = "slack_token";
    private static readonly KEY_SLACK_ROOM = "slack_room";

    constructor() {

    }

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

    public getStatusPrefix() :string {
        const result: string = load(ConfigDataStore.KEY_STATUS_PREFIX);
        return result ? result : "NowBrowsing:";
    }

    public setStatusPrefix(prefix: string) {
        save(ConfigDataStore.KEY_STATUS_PREFIX, prefix);
    }

    public useSlack():boolean {
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
        return load(ConfigDataStore.KEY_SLACK_TOKEN);
    }

    public setSlackToken(token: string) {
        save(ConfigDataStore.KEY_SLACK_TOKEN, token);
    }

    public getSlackRoom(): string {
        return load(ConfigDataStore.KEY_SLACK_ROOM);
    }

    public setSlackRoom(room: string) {
        save(ConfigDataStore.KEY_SLACK_ROOM, room);
    }
}

export default new ConfigDataStore();
