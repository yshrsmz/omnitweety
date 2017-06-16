import { IAction, IPayloadAction } from "../../common/actions";
import Account from "../../data/account";

export const LOCAL_ACCOUNT_REQUESTED = "ACCOUNT_REQUESTED";
export const notifyLocalAccountRequested = (): IAction => ({ type: LOCAL_ACCOUNT_REQUESTED });

export const ACCOUNT_REQUESTED = "ACCOUNT_REQUESTED";
export const notifyAccountRequested = (): IAction => ({ type: ACCOUNT_REQUESTED });

export const ACCOUNT_INITIAL_DATA_LOADED = "ACCOUNT_INITIAL_DATA_LOADED";
export const notifyAccountInitialDataLoaded = (authorized: Boolean, account: Account) => {
    return {
        type: ACCOUNT_INITIAL_DATA_LOADED,
        payload: {
            authorized,
            account,
        },
    };
}
