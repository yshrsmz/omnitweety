import * as Configs from "../common/config";

import accessTokenRepository from "../data/access_token_repository";
import * as Actions from "./actions";
import configureStore from "./configureStore";
import * as router from "./router";
import rootSaga from "./sagas";

import { getLoginStatus } from "./reducers/login_status";

const store = configureStore();
store.runSaga(rootSaga);

store.subscribe(() => {
    const loginStatus = getLoginStatus(store.getState());
    if (loginStatus.isLoaded && !loginStatus.isLoggedIn) {
        // start login process
        console.info("Not autorized, start login process...");
        router.navigateToOptionsPage();
    } else {

    }
});

store.dispatch(Actions.requestLoginStatus());
