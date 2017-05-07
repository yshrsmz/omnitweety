import { END, eventChannel } from "redux-saga";
import { call, cancel, cancelled, fork, put, race, take, takeEvery } from "redux-saga/effects";

import * as Actions from "../actions";
import parseStatus from "../../parser/status_parser";

function* runCalculateStatus({ payload }: { type: string, payload: string }) {
    const parsed = parseStatus(payload);
    console.log(parsed);
    yield put(Actions.notifyStatusPartsUpdated(null));
}

function* handleStatusUpdated() {
    yield takeEvery(Actions.UPDATE_OMNIBOX, runCalculateStatus);
}

function handleStatusFixed() {

}

function* runCancelStatus() {
    yield put(Actions.notifyStatusReset());
}

function* handleOmniboxCancelled() {
    yield takeEvery(Actions.CANCEL_OMNIBOX, runCancelStatus);
}

export function* handleStatusChange() {
    yield fork(handleStatusUpdated);
    yield fork(handleOmniboxCancelled);
}
