import { END, eventChannel } from "redux-saga";
import { call, cancel, cancelled, fork, put, race, take, takeEvery, takeLatest } from "redux-saga/effects";

import parseStatus from "../../parser/status_parser";
import * as Actions from "../actions";

interface IPage {
    title: string;
    url: string;
}

async function getWebPageInfo(): Promise<IPage> {
    return new Promise<IPage>((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, (pages) => {
            if (pages.length > 0) {
                resolve({ title: pages[0].title, url: pages[0].url} );
            } else {
                reject(null);
            }
        });
    });
}

function* runCalculateStatus(fixed: boolean, input: string) {
    const parsed = parseStatus(input);

    let page: IPage = null;
    if (parsed.share) {
        page = yield getWebPageInfo();
    }

    const newPayload: Actions.IStatusPartsPayload = {
        flags: {
            options: parsed.options,
            share: parsed.share,
            slack: parsed.slack,
            twitter: parsed.twitter,
            version: parsed.version,
        },
        web: {
            url: parsed.share ? page.url : "",
            title: parsed.share ? page.title : "",
        },
        userInput: parsed.status,
        content: "",
        fixed,
    };
    return newPayload;
}

function* handleStatusUpdated() {
    while (true) {
        const { payload }: Actions.IPayloadAction<string> = yield take(Actions.UPDATE_OMNIBOX);
        const newPayload = yield call(runCalculateStatus, false, payload);
        yield put(Actions.notifyStatusPartsUpdated(newPayload));
    }
}

function* handleStatusFixed() {
    while (true) {
        const { payload }: Actions.IPayloadAction<string> = yield take(Actions.FIX_OMNIBOX);
        const newPayload = yield call(runCalculateStatus, true, payload);

        yield put(Actions.notifyStatusPartsUpdated(newPayload)); // update store

        // call update api
    }
}

function* runCancelStatus() {
    yield put(Actions.notifyStatusReset());
}

function* handleStatusCancelled() {
    yield takeLatest(Actions.CANCEL_OMNIBOX, runCancelStatus);
}

export function* handleStatusChange() {
    yield fork(handleStatusUpdated);
    yield fork(handleStatusFixed);
    yield fork(handleStatusCancelled);
}
