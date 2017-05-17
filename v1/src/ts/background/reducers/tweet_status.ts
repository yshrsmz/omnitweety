import { combineReducers } from "redux";
import * as Actions from "../actions";
import { IPayloadAction, IStatusPartsPayload } from "../actions";

export interface IStatusFlags {
    options: boolean;
    share: boolean;
    slack: boolean;
    twitter: boolean;
    version: boolean;
}

export interface IStatusContent {
    userInput: string;
    prefix: string;
    composed: string;
    length: number;
    fixed: boolean;
}

const initialFlags = {
    options: false,
    share: false,
    slack: false,
    twitter: false,
    version: false,
};

const initialContent = {
    userInput: "",
    prefix: "",
    composed: "",
    length: 0,
    fixed: false,
};

const flags = (state: IStatusFlags = initialFlags, action: IPayloadAction<IStatusPartsPayload>) => {
    switch (action.type) {
        case Actions.STATUS_PARTS_UPDATED:
            const statusFlags = action.payload.flags;
            return {
                ...state,
                options: statusFlags.options,
                share: statusFlags.share,
                slack: statusFlags.slack,
                twitter: statusFlags.twitter,
                version: statusFlags.version,
            };
        case Actions.STATUS_RESET:
            return {
                ...state,
                options: false,
                share: false,
                slack: false,
                twitter: false,
                version: false,
            };
        default:
            return state;
    }
};

const content = (state: IStatusContent = initialContent, action: IPayloadAction<IStatusPartsPayload>) => {
    switch (action.type) {
        case Actions.STATUS_PARTS_UPDATED:
            const payload = action.payload;
            return {
                ...state,
                userInput: payload.userInput,
                composed: payload.content,
                length: payload.length,
                fixed: payload.fixed,
            };
        case Actions.STATUS_RESET:
            return {
                ...state,
                userInput: "",
                composed: "",
                length: 0,
                fixed: false,
            };
        default:
            return state;
    }
};

export const getStatusFlags = (state: any): IStatusFlags => state.tweet.flags;
export const getStatusContent = (state: any): IStatusContent => state.tweet.content;

const status = combineReducers({
    flags,
    content,
});

export default status;
