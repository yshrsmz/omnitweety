import * as Configs from "../common/config";

import accessTokenRepository from "../data/access_token_repository";
import * as Actions from "./actions";
import configureStore from "./configureStore";
import rootSaga from "./sagas";

console.log(Configs.TwitterConfig.API_KEY, Configs.TwitterConfig.API_SECRET, accessTokenRepository.isAuthorized());

const store = configureStore();
store.runSaga(rootSaga);

store.dispatch(Actions.requestLoginStatus());
