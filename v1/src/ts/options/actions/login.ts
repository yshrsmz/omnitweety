import { IAction, IPayloadAction } from "../../common/actions";
import AccessToken from "../../data/access_token";

export const LOGIN_REQUESTED = "login/LOGIN_REQUESTED";
export const notifyLoginRequested = (): IAction => ({ type: LOGIN_REQUESTED });

export const LOGIN_PINCODE_RECEIVED = "login/LOGIN_PINCODE_RECEIVED";
export const notifyLoginPincodeRecceived = (pinCode: string): IPayloadAction<string> => ({
    type: LOGIN_PINCODE_RECEIVED,
    payload: pinCode,
});

export const LOGIN_TOKEN_RECEIVED = "login/LOGIN_TOKEN_RECEIVED";
export const notifyLoginTokenReceived = (token: string, tokenSecret: string): IPayloadAction<AccessToken> => ({
    type: LOGIN_TOKEN_RECEIVED,
    payload: new AccessToken(token, tokenSecret),
});

export const LOGIN_USER_RECEIVED = "login/LOGIN_USER_RECEIVED";
export const notifyLoginUserReceived = (): IAction => ({ type: LOGIN_USER_RECEIVED });
