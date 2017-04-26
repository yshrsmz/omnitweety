import { fork } from "redux-saga/effects";

import AccessTokenRepository from "../../data/access_token_repository";
import * as checkLoginSagas from "./check_login";

export default function* rootSaga() {
    yield fork(checkLoginSagas.handleCheckLoginStatus);
}
