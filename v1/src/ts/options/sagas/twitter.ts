import { call, fork, put, takeEvery } from "redux-saga/effects";
import accessTokenRepository from "../../data/access_token_repository";
import accountRepository from "../../data/account_repository";
import * as Actions from "../actions";
import * as AccountActions from "../actions/twitter";

function* runTwitterInitialDataRequested() {
    const authorized = accessTokenRepository.isAuthorized();
    const account = accountRepository.get();
    yield put(AccountActions.notifyAccountInitialDataLoaded(authorized, account));

}
function* handleTwitterInitialDataRequested() {
    yield takeEvery(Actions.INITIAL_DATA_REQUESTED, runTwitterInitialDataRequested);
}

export function* handleTwitterEvents() {
    yield fork(handleTwitterInitialDataRequested);
}
