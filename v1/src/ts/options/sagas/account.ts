import { call, fork, put, takeEvery } from "redux-saga/effects";
import * as Actions from "../actions";
import * as AccountActions from "../actions/account";
import accessTokenRepository from "../../data/access_token_repository";
import accountRepository from "../../data/account_repository";

function* runAccountInitialDataRequested() {
    const authorized = accessTokenRepository.isAuthorized()
    const account = accountRepository.get()
    yield put(AccountActions.notifyAccountInitialDataLoaded(authorized, account))

}
function* handleAccountInitialDataRequested() {
    yield takeEvery(Actions.INITIAL_DATA_REQUESTED, runAccountInitialDataRequested);
}

export function* handleAccountEvents() {
    yield takeEvery(Actions.INITIAL_DATA_REQUESTED, handleAccountInitialDataRequested);
}
