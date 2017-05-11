import * as Configs from "../common/config";

import accessTokenRepository from "../data/access_token_repository";
import * as Actions from "./actions";
import configureStore from "./configureStore";
import renderSuggestion from "./renderSuggestion";
import * as router from "./router";
import rootSaga from "./sagas";

const store = configureStore();
store.runSaga(rootSaga);

store.subscribe(() => renderSuggestion(store.getState()));

store.dispatch(Actions.requestLoginStatus());
