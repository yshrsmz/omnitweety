import { call, fork, put, takeEvery } from "redux-saga/effects";

import * as Actions from "../actions";
import * as router from "../router";

function runNavigateToAuthPage() {
    router.navigateToAuthPage();
}

function* handleNavigateToAuthPage() {
    yield takeEvery(Actions.NAVIGATE_AUTH, runNavigateToAuthPage);
}

function runNavigateToOptionsPage() {
    router.navigateToOptionsPage();
}

function* handleNavigateToOptionsPage() {
    yield takeEvery(Actions.NAVIGATE_OPTIONS, runNavigateToOptionsPage);
}

export function* handleRouting() {
    yield fork(handleNavigateToAuthPage);
    yield fork(handleNavigateToOptionsPage);
}
