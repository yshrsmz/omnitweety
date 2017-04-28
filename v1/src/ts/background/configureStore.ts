import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
} from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "remote-redux-devtools";

import * as reducers from "./reducers";

declare const window: any;

const configureStore = (preloadedState = {}) => {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = composeWithDevTools({ realtime: true, hostname: "localhost", port: 8080 });

    return {
        ...createStore(
            combineReducers({
                ...reducers,
            }),
            preloadedState,
            composeEnhancers(
                applyMiddleware(
                    logger,
                    sagaMiddleware,
                ),
            ),
        ),
        runSaga: sagaMiddleware.run,
    };
};

export default configureStore;