import * as Configs from "../common/config";

import accessTokenRepository from "../data/access_token_repository";
import * as Actions from "./actions";
import configureStore from "./configureStore";
import rootSaga from "./sagas";

import { getLoginStatus } from "./reducers/login_status";

console.log(Configs.TwitterConfig.API_KEY, Configs.TwitterConfig.API_SECRET, accessTokenRepository.isAuthorized());

const store = configureStore();
store.runSaga(rootSaga);

store.subscribe(() => {
    const loginStatus = getLoginStatus(store.getState());
    if (loginStatus.isLoaded && !loginStatus.isLoggedIn) {
        console.info("Not autorized, start login process...");
    }
});

store.dispatch(Actions.requestLoginStatus());
