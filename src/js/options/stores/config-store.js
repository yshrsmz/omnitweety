'use strict';

import {EventEmitter} from 'events';

import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatcher/app-dispatcher';
import ApiTokens from '../../../../apikey';

let {
    ActionTypes, Values
} = AppConstants;

const KEY_TOKEN = `oauth_token_${encodeURI(Values.OAUTH_SCOPE)}`;
const KEY_TOKEN_SECRET = `oauth_token_secret_${encodeURI(Values.OAUTH_SCOPE)}`;

const KEY_USE_SLACK = "slack_use";
const KEY_SLACK_TOKEN = "slack_token";
const KEY_SLACK_USER = "slack_user";
const KEY_SLACK_ROOM = "slack_room";

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
            case ActionTypes.SAVE_TOKEN:
                let tokens = action.tokens;
                save(KEY_TOKEN, tokens.token);
                save(KEY_TOKEN_SECRET, tokens.token_secret);

                this.emitChange();
                break;

            case ActionTypes.DEAUTH:
                break;

            case ActionTypes.SAVE_USE_SLACK:
                let useSlack = action.slackUseSlack;
                save(KEY_USE_SLACK, useSlack);

                this.emitChange();
                break;

            case ActionTypes.SAVE_SLACK_TOKEN:
                let token = action.slackToken;
                save(KEY_SLACK_TOKEN, token);

                this.emitChange();
                break;

            case ActionTypes.SAVE_SLACK_USER:
                let user = action.slackUser;
                save(KEY_SLACK_USER, user);

                this.emitChange();
                break;

            case ActionTypes.SAVE_SLACK_ROOM:
                let room = action.slackRoom;
                save(KEY_SLACK_ROOM, room);

                this.emitChange();
                break;

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

    useSlack() {
        let _useSlack = load(KEY_USE_SLACK);
        if (_useSlack) {
            return JSON.parse(_useSlack);
        } else {
            return false;
        }
    }
    getSlackToken() {
        return load(KEY_SLACK_TOKEN);
    }
    getSlackUser() {
        return load(KEY_SLACK_USER);
    }
    getSlackRoom() {
        return load(KEY_SLACK_ROOM);
    }
}

export default new ConfigStore();
