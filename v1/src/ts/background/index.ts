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
        // show login suggestion
    } else {
        // show status preview or status length
    }
});

store.dispatch(Actions.requestLoginStatus());
