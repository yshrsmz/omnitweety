import { call, fork, put, takeEvery } from "redux-saga/effects";

import { IPayloadAction } from "../../common/actions";
import configDataStore from "../../data/config_datastore";
import * as Actions from "../actions";

function* runPrefixInitialDataRequested() {
    yield put(Actions.notifyPrefixInitialDataLoaded(
        configDataStore.getStatusPrefix(),
    ));
}

function* handlePrefixInitialDataRequested() {
    yield takeEvery(Actions.INITIAL_DATA_REQUESTED, runPrefixInitialDataRequested);
}

function runPrefixUpdated({ payload }: IPayloadAction<string>) {
    configDataStore.setStatusPrefix(payload);
}

function* handlePrefixUpdated() {
    yield takeEvery(Actions.PREFIX_UPDATED, runPrefixUpdated);
}

export function* handlePrefixConfigEvents() {
    yield fork(handlePrefixInitialDataRequested);
    yield fork(handlePrefixUpdated);
}
