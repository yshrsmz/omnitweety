import { fork } from "redux-saga/effects";

import AccessTokenRepository from "../../data/access_token_repository";
import * as checkLoginSagas from "./check_login";
import * as checkOmniboxSagas from "./check_omnibox";
import * as routing from "./routing";

export default function* rootSaga() {
    yield fork(routing.handleRouting);
    yield fork(checkLoginSagas.handleCheckLoginStatus);
    yield fork(checkOmniboxSagas.handleOmniboxEvents);
}
