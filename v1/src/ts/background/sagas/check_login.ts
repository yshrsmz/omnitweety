import { call, put, takeEvery } from "redux-saga/effects";

import accessTokenRepository from "../../data/access_token_repository";
import * as Actions from "../actions";

function* runRequestLoginStatus() {
    const isAuthorized = accessTokenRepository.isAuthorized();
    yield put(Actions.receiveLoginStatus(isAuthorized));
}

export function* handleCheckLoginStatus() {
    yield takeEvery(Actions.CHECK_LOGIN_REQUEST, runRequestLoginStatus);
}
