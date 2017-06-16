import Account from "./account";
import configDataStore from "./config_datastore";

class AccountRepository {
    constructor() {}

    public set(account: Account) {
        configDataStore.setTwitterName(account.name);
        configDataStore.setTwitterScreenName(account.screenName);
        configDataStore.setTwitterThumbUrl(account.thumbUrl);
    }

    public get():Account {
        const name = configDataStore.getTwitterName();
        const screenName = configDataStore.getTwitterScreenName();
        const thumbUrl = configDataStore.getTwitterThumbUrl();
        return new Account(name, screenName, thumbUrl);
    }

    public clear() {
        configDataStore.clearTwitterName();
        configDataStore.clearTwitterScreenName();
        configDataStore.clearTwitterThumbUrl();
    }
}

export default new AccountRepository();
