import { END, eventChannel } from "redux-saga";
import { call, cancel, cancelled, fork, put, race, take, takeEvery } from "redux-saga/effects";

import * as Actions from "../actions";
import parseStatus from "../../parser/status_parser";

interface IPage {
    title: string;
    url: string;
}

async function getWebPageInfo() {
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

function* runCalculateStatus(fixed: boolean, { payload }: Actions.IAction<string>) {
    const parsed = parseStatus(payload);

    let page: IPage = null;
    if (parsed.share) {
        page = yield getWebPageInfo()
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
        fixed: fixed,
    };
    console.log("newPayload", newPayload);
    yield put(Actions.notifyStatusPartsUpdated(newPayload));
}

function* handleStatusUpdated() {
    yield takeEvery(Actions.UPDATE_OMNIBOX, runCalculateStatus, false);
}

function* handleStatusFixed() {
    yield takeEvery(Actions.FIX_OMNIBOX, runCalculateStatus, true);
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
