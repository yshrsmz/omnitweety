import { call, fork, put, takeEvery } from "redux-saga/effects";

import { IPayloadAction } from "../../common/actions";
import accessTokenRepository from "../../data/access_token_repository";
import authorizer from "../../data/authorizer";
import configDataStore from "../../data/config_datastore";
import * as Actions from "../actions/login";

function runLoginRequested() {
    authorizer.request()
        .then((url) => {
            console.log(`request url: ${url}`);
        });
}

function* handleLoginRequested() {
    yield takeEvery(Actions.LOGIN_REQUESTED, runLoginRequested);
}

function runPincodeReceived({ payload }: IPayloadAction<string>) {
    authorizer.accept(payload)
        .then((token) => {
            console.log(`token: ${token}`);
        });
}

function* handlePincodeReceived() {
    yield takeEvery(Actions.LOGIN_PINCODE_RECEIVED, runPincodeReceived);
}

export function* handleLoginEvents() {
    yield fork(handleLoginRequested);
    yield fork(handlePincodeReceived);
}
