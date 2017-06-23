import { fork } from "redux-saga/effects";

import * as login from "./login";
import * as prefix from "./prefix";
import * as slack from "./slack";
import * as twitter from "./twitter";

export default function* rootSaga() {
    yield fork(login.handleLoginEvents);
    yield fork(prefix.handlePrefixConfigEvents);
    yield fork(slack.handleSlackConfigEvents);
    yield fork(twitter.handleTwitterEvents);
}
