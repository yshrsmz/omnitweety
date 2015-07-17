'use strict';

import {EventEmitter} from 'events';

import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatcher/app-dispatcher';
import ApiTokens from '../../../../apikey';

const KEY_TOKEN = `oauth_token_${encodeURI(AppConstants.OAUTH_SCOPE)}`;
const KEY_TOKEN_SECRET = `oauth_token_secret_${encodeURI(AppConstants.OAUTH_SCOPE)}`;

const CHANGE_EVENT = 'change';

let save = function(key, value) {
    localStorage[key] = value;
};

let load = function(key) {
    return localStorage[key];
};

let clear = function(key) {
    delete localStorage[key];
};

class ConfigStore extends EventEmitter {
    constructor() {
        super();

        this.dispatchToken = AppDispatcher.register(this.handler.bind(this));
    }

    handler(action) {

        switch (action.actionType) {
            case AppConstants.SAVE_TOKEN:
                let tokens = action.tokens;
                save(KEY_TOKEN, tokens.token);
                save(KEY_TOKEN_SECRET, tokens.token_secret);

                this.emitChange();
                break;

            case AppConstants.DEAUTH:

        }
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getToken() {
        return load(KEY_TOKEN);
    }

    getTokenSecret() {
        return load(KEY_TOKEN_SECRET);
    }

    clearTokens() {
        clear(KEY_TOKEN);
        clear(KEY_TOKEN_SECRET);
    }

    getTokens() {
        return {
            token: getToken(),
            token_secret: getTokenSecret()
        };
    }

    hasToken() {
        return !!this.getToken();
    }
}

export default new ConfigStore();
