import { IAction, IPayloadAction } from "../../common/actions";

export const INITIAL_DATA_REQUESTED = "INITIAL_DATE_REQUESTED";
export const PREFIX_INITIAL_DATA_LOADED = "PREFIX_INITIAL_DATA_LOADED";
export const SLACK_INITIAL_DATA_LOADED = "SLACK_INITIAL_DATA_LOADED";

export const notifyInitialDataRequested = (): IAction => ({ type: INITIAL_DATA_REQUESTED });

export interface ISlack {
    use: boolean;
    token: string;
    room: string;
}
export const notifySlackInitialDataLoaded = (use: boolean, token: string, room: string): IPayloadAction<ISlack> => ({
    type: SLACK_INITIAL_DATA_LOADED,
    payload: {
        use,
        token,
        room,
    },
});

export const notifyPrefixInitialDataLoaded = (prefix: string): IPayloadAction<string> => ({
    type: PREFIX_INITIAL_DATA_LOADED,
    payload: prefix,
});

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
