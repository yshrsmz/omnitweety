import { END, eventChannel } from "redux-saga";
import { call, cancel, cancelled, fork, put, race, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import * as TwitterText from "twitter-text";

import { TwitterConfig } from "../../common/config";
import parseStatus from "../../parser/status_parser";
import * as Actions from "../actions";
import { IAction, IPayloadAction } from "../../common/actions";

interface IPage {
    title: string;
    url: string;
}

interface IContent {
    content: string;
    length: number;
}

function buildShareText(prefix: string, title: string, url: string, shortUrlLength: number): IContent {
    const options = { short_url_length: 29, short_url_length_https: 29 };
    const textLength = TwitterText.getTweetLength(`${prefix} ${title} ${url}`,
        options);
    const lengthDiff = TwitterConfig.STATUS_LENGTH - textLength;

    let resultText: string;
    if (lengthDiff < 0) {
        resultText = `${prefix} ${title.slice(0, lengthDiff)} ${url}`;
    } else {
        resultText = `${prefix} ${title} ${url}`;
    }

    return {
        content: resultText,
        length: TwitterText.getTweetLength(resultText, options),
    };
}

function buildText(text: string, shortUrlLength: number): IContent {
    const options = { short_url_length: 29, short_url_length_https: 29 };
    return {
        content: text,
        length: TwitterText.getTweetLength(text, options),
    };
}

async function getWebPageInfo(): Promise<IPage> {
    return new Promise<IPage>((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
            if (pages.length > 0) {
                resolve({ title: pages[0].title, url: pages[0].url });
            } else {
                reject(null);
            }
        });
    });
}

function* runCalculateStatus(fixed: boolean, input: string) {
    const parsed = parseStatus(input);

    let page: IPage;
    let content: IContent;
    if (parsed.share) {
        page = yield getWebPageInfo();
        content = buildShareText(parsed.status, page.title, page.url, 29);
    } else {
        page = null;
        content = buildText(parsed.status, 29);
    }

    const newPayload: Actions.IStatusPartsPayload = {
        flags: {
            options: parsed.options,
            share: parsed.share,
            slack: parsed.slack,
            twitter: parsed.twitter,
            version: parsed.version,
        },
        web: (page === null) ? null : {
            url: page.url,
            title: page.title,
        },
        userInput: parsed.status,
        content: content.content,
        length: content.length,
        fixed,
    };
    return newPayload;
}

function* handleStatusUpdated() {
    while (true) {
        const { payload }: IPayloadAction<string> = yield take(Actions.UPDATE_OMNIBOX);
        const newPayload = yield call(runCalculateStatus, false, payload);
        yield put(Actions.notifyStatusPartsUpdated(newPayload));
    }
}

function* handleStatusFixed() {
    while (true) {
        const { payload }: IPayloadAction<string> = yield take(Actions.FIX_OMNIBOX);
        const newPayload = yield call(runCalculateStatus, true, payload);

        yield put(Actions.notifyStatusPartsUpdated(newPayload));
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
