import { END, eventChannel } from "redux-saga";
import { call, cancel, cancelled, fork, put, race, take, takeEvery } from "redux-saga/effects";

import * as Actions from "../actions";
import parseStatus, { IParsedStatus } from "./parse_status";

function checkOmniboxInputStarted() {
    return eventChannel((emitter) => {
        const listener = () => {
            emitter(true);
        };

        chrome.omnibox.onInputStarted.addListener(listener);

        return () => {
            chrome.omnibox.onInputStarted.removeListener(listener);
        };
    });
}

function checkOmniboxInputChanged() {
    return eventChannel((emitter) => {
        const listener = (text: string) => {
            emitter(text);
        };

        chrome.omnibox.onInputChanged.addListener(listener);

        return () => {
            chrome.omnibox.onInputChanged.removeListener(listener);
        };
    });
}

function checkOmniboxInputEntered() {
    return eventChannel((emitter) => {
        const listener = (text: string) => {
            emitter(text);
            emitter(END);
        };

        chrome.omnibox.onInputEntered.addListener(listener);

        return () => {
            chrome.omnibox.onInputEntered.removeListener(listener);
        };
    });
}

function checkOmniboxInputCanceled() {
    return eventChannel((emitter) => {
        const listener = () => {
            emitter(true);
            emitter(END);
        };

        chrome.omnibox.onInputCancelled.addListener(listener);

        return () => {
            chrome.omnibox.onInputCancelled.removeListener(listener);
        };
    });
}

function* handleOmniboxInput() {
    const inputChanged = yield call(checkOmniboxInputChanged);
    try {
        while (true) {
            const input = yield take(inputChanged);
            yield put(Actions.notifyOmniboxUpdated(input));
        }
    } finally {
        if (yield cancelled()) {
            inputChanged.close();
        }
    }
}

export function* handleOmniboxEvents() {
    while (true) {
        yield take(checkOmniboxInputStarted());

        const watcherTask = yield fork(handleOmniboxInput);

        const inputFinished = yield call(checkOmniboxInputEntered);
        const inputCancelled = yield call(checkOmniboxInputCanceled);
        const result = yield race({
            task: take(inputFinished),
            cancel: take(inputCancelled),
        });
        if (result.cancel) {
            yield put(Actions.notifyOmniboxFinished(""));
        } else {
            yield put(Actions.notifyOmniboxFinished(result.task));
        }
        yield cancel(watcherTask);
    }
}
