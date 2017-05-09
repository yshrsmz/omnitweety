import * as Actions from "../actions";

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
}

const initialStatusFlagsState = {
    options: false,
    share: false,
    slack: false,
    twitter: false,
    version: false,
};

const tweetStatusFlags = (state: IStatusFlags = initialStatusFlagsState, action: Actions.IPayloadAction<Actions.IStatusPartsPayload>) => {
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

const tweetStatusContent = () => {};
