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

const initialStatusFlags = {
    options: false,
    share: false,
    slack: false,
    twitter: false,
    version: false,
};

const initialStateusContent = {
    userInput: "",
    prefix: "",
    composed: "",
    length: 0,
    fixed: false,
};

const statusFlags = (state: IStatusFlags = initialStatusFlags, action: IPayloadAction<IStatusPartsPayload>) => {
    let flags;
    switch (action.type) {
        case Actions.STATUS_PARTS_UPDATED:
            flags = action.payload.flags;
            return {
                ...state,
                options: flags.options,
                share: flags.share,
                slack: flags.slack,
                twitter: flags.twitter,
                version: flags.version,
            };
        case Actions.STATUS_RESET:
            flags = action.payload.flags;
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

const statusContent = (state: IStatusContent = initialStateusContent, action: IPayloadAction<IStatusPartsPayload>) => {
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

export const getTweetStatusFlags = (state: any): IStatusFlags => state.tweetStatusFlags;
export const getTweetStatusContent = (state: any): IStatusContent => state.tweetStatusContent;

const tweet = combineReducers({
    statusFlags,
    statusContent,
});

export default tweet;
