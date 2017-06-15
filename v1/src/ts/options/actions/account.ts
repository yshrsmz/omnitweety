import { IAction, IPayloadAction } from "../../common/actions";

export const LOCAL_ACCOUNT_REQUESTED = "ACCOUNT_REQUESTED";
export const notifyLocalAccountRequested = (): IAction => ({ type: LOCAL_ACCOUNT_REQUESTED });

export const ACCOUNT_REQUESTED = "ACCOUNT_REQUESTED";
export const notifyAccountRequested = (): IAction => ({ type: ACCOUNT_REQUESTED });
