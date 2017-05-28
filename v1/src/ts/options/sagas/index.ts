import { fork } from "redux-saga/effects";

import * as prefix from "./prefix";
import * as slack from "./slack";

export default function* rootSaga() {
    yield fork(prefix.handlePrefixEvents);
    yield fork(slack.handleSlackConfigEvents);
}
