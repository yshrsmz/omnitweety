import { call, fork, put, takeEvery } from "redux-saga/effects";

import { IPayloadAction } from "../../common/actions";
import configDataStore from "../../data/config_datastore";
import * as Actions from "../actions";

function* runInitialDataRequested() {
    yield put(Actions.notifyPrefixInitialDataLoaded(
        configDataStore.getStatusPrefix(),
    ));
    yield put(Actions.notifySlackInitialDataLoaded(
        configDataStore.useSlack(),
        configDataStore.getSlackToken(),
        configDataStore.getSlackRoom(),
    ));
}

function* handleInitialDataRequested() {
    yield takeEvery(Actions.INITIAL_DATA_REQUESTED, runInitialDataRequested);
}

function runUseSlackUpdated({ payload }: IPayloadAction<boolean>) {
    configDataStore.setUseSlack(payload);
}

function* handleUseSlackUpdated() {
    yield takeEvery(Actions.USE_SLACK_UPDATED, runUseSlackUpdated);
}

function runSlackTokenUpdated({ payload }: IPayloadAction<string>) {
    configDataStore.setSlackToken(payload);
}

function* handleSlackTokenUpdated() {
    yield takeEvery(Actions.SLACK_TOKEN_UPDATED, runSlackTokenUpdated);
}

function runSlackRoomUpdated({ payload }: IPayloadAction<string>) {
    configDataStore.setSlackRoom(payload);
}

function* handleSlackRoomUpdated() {
    yield takeEvery(Actions.SLACK_ROOM_UPDATED, runSlackRoomUpdated);
}

export function* handleSlackConfigEvents() {
    yield fork(handleInitialDataRequested);
    yield fork(handleUseSlackUpdated);
    yield fork(handleSlackTokenUpdated);
    yield fork(handleSlackRoomUpdated);
}
