import { Action } from "redux";

export const CHECK_LOGIN_REQUEST = "CHECK_LOGIN_REQUEST";
export const CHECK_LOGIN_RECEIVE = "CHECK_LOGIN_SUCCESS";
export const CHECK_LOGIN_FAILURE = "CHECK_LOGIN_FAILURE";

export interface IAction extends Action {
}

export interface IPayloadAction<T> extends IAction {
    payload: T;
}

export const requestLoginStatus = () => ({
    type: CHECK_LOGIN_REQUEST,
});

export const receiveLoginStatus = (loggedIn: boolean) => ({
    type: CHECK_LOGIN_RECEIVE,
    payload: loggedIn,
});

export const UPDATE_OMNIBOX = "UPDATE_OMNIBOX";
export const FIX_OMNIBOX = "FIX_OMNIBOX";
export const CANCEL_OMNIBOX = "CANCEL_OMNIBOX";

export const notifyOmniboxUpdated = (value: string) => ({
    type: UPDATE_OMNIBOX,
    payload: value,
});

export const notifyOmniboxFixed = (value: string) => ({
    type: FIX_OMNIBOX,
    payload: value,
});

export const notifyOmniboxCancelled = () => ({ type: CANCEL_OMNIBOX });

export interface IStatusPartsPayload {
    flags: {
        options: boolean;
        share: boolean;
        slack: boolean;
        twitter: boolean;
        version: boolean;
    };
    web: {
        url: string;
        title: string;
    };
    userInput: string;
    content: string;
    length: number;
    fixed: boolean;
}

export const STATUS_PARTS_UPDATED = "STATUS_PARTS_UPDATED";
export const STATUS_RESET = "STATUS_RESET";

export const notifyStatusPartsUpdated = (parts: IStatusPartsPayload) => ({
    type: STATUS_PARTS_UPDATED,
    payload: parts,
});

export const notifyStatusReset = () => ({ type: STATUS_RESET });

export const SEND_STATUS_REQUEST = "SEND_STATUS_REQUEST";
export const SEND_STATUS_SUCCESS = "SEND_STATUS_SUCCESS";
export const SEND_STATUS_FAILURE = "SEND_STATUS_FAILURE";

export const requestSendStatus = (status: string) => ({
    type: SEND_STATUS_REQUEST,
    payload: status,
});

export const NAVIGATE_OPTIONS = "NAVIGATE_OPTIONS";
export const NAVIGATE_AUTH = "NAVIGATE_AUTH";

export const navigateToAuthPage = () => ({ type: NAVIGATE_AUTH });
export const navigateToOptions = () => ({ type: NAVIGATE_OPTIONS });
