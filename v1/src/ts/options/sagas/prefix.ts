import { call, fork, put, takeEvery } from "redux-saga/effects";

import { IPayloadAction } from "../../common/actions";
import configDataStore from "../../data/config_datastore";
import * as Actions from "../actions";

function runPrefixUpdated({ payload }: IPayloadAction<string>) {
    configDataStore.setStatusPrefix(payload);
}

function* handlePrefixUpdated() {
    yield takeEvery(Actions.PREFIX_UPDATED, runPrefixUpdated);
}

export function* handlePrefixConfigEvents() {
    yield fork(handlePrefixUpdated);
}
