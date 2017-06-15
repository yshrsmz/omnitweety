import { call, fork, put, takeEvery } from "redux-saga/effects";
import * as Actions from "../actions";

function* handleAccountInitialDataRequested() {

}

export function* handleAccountEvents() {
    yield takeEvery(Actions.INITIAL_DATA_REQUESTED, handleAccountInitialDataRequested);
}
