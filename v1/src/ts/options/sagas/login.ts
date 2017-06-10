import { call, fork, put, takeEvery } from "redux-saga/effects";

import { IPayloadAction } from "../../common/actions";
import configDataStore from "../../data/config_datastore";
import * as Actions from "../actions/twitter";
import accessTokenRepository from "../../data/access_token_repository";
import authorizer from "../../data/authorizer";

function runLoginRequested() {
    authorizer.request()
        .then(url => {
            console.log(`request url: ${url}`)
        });
}

function* handleLoginRequested() {
    yield takeEvery(Actions.LOGIN_REQUESTED, runLoginRequested);
}
