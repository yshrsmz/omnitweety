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

const tweetStatusFlags = (state: IStatusFlags = initialStatusFlags, action: IPayloadAction<IStatusPartsPayload>) => {
    const flags = action.payload.flags;
    switch (action.type) {
        case Actions.STATUS_PARTS_UPDATED:
            return {
                ...state,
                options: flags.options,
                share: flags.share,
                slack: flags.slack,
                twitter: flags.twitter,
                version: flags.version,
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

const tweetStatusContent = (state: IStatusContent = initialStateusContent, action: IPayloadAction<IStatusPartsPayload>) => {
    switch (action.type) {
        case Actions.STATUS_PARTS_UPDATED:
            return {
                ...state,
            };
        case Actions.STATUS_RESET:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export const getTweetStatusFlags = (state: any): IStatusFlags => state.tweetStatusFlags;
export const getTweetStatusContent = (state: any): IStatusContent => state.tweetStatusContent;
