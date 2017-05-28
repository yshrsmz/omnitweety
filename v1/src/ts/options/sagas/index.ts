import { fork } from "redux-saga/effects";

import * as prefix from "./prefix";
import * as slack from "./slack";

export default function* rootSaga() {
    yield fork(prefix.handlePrefixConfigEvents);
    yield fork(slack.handleSlackConfigEvents);
}
