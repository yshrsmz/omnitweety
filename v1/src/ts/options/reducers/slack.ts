import { IPayloadAction } from "../../common/actions";
import * as Actions from "../actions";

export interface ISlack {
    use: boolean;
    token: string;
    room: string;
}

const initialState = {
    use: false,
    token: "",
    room: "",
};

const slack = (state: ISlack = initialState, action: IPayloadAction<boolean | string | Actions.ISlack>) => {
    switch (action.type) {
        case Actions.SLACK_INITIAL_DATA_LOADED:
            const payload = action.payload as Actions.ISlack;
            return {
                ...state,
                use: payload.use,
                token: payload.token,
                room: payload.room,
            };
        case Actions.USE_SLACK_UPDATED:
            return {
                ...state,
                use: action.payload,
            };
        case Actions.SLACK_TOKEN_UPDATED:
            return {
                ...state,
                token: action.payload,
            };
        case Actions.SLACK_ROOM_UPDATED:
            return {
                ...state,
                room: action.payload,
            };
        default:
            return state;
    }
};

export default slack;