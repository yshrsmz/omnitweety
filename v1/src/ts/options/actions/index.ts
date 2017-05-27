import { IAction, IPayloadAction } from "../../common/actions";

export const PREFIX_UPDATED = "PREFIX_UPDATED";

export const notifyPrefixUpdated = (prefix: string): IPayloadAction<string> => ({
    type: PREFIX_UPDATED,
    payload: prefix,
});

export const USE_SLACK_UPDATED = "USE_SLACK_UPDATED";
export const SLACK_TOKEN_UPDATED = "SLACK_TOKEN_UPDATED";
export const SLACK_ROOM_UPDATED = "SLACK_ROOM_UPDATED";

export const notifyUseSlackUpdated = (useSlack: boolean): IPayloadAction<boolean> => ({
    type: USE_SLACK_UPDATED,
    payload: useSlack,
});

export const notifySlackTokenUpdated = (token: string): IPayloadAction<string> => ({
    type: SLACK_TOKEN_UPDATED,
    payload: token,
});

export const notifySlackRoomUpdated = (room: string): IPayloadAction<string> => ({
    type: SLACK_ROOM_UPDATED,
    payload: room,
});
