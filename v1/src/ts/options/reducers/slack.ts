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

const slack = (state: ISlack = initialState, action: IPayloadAction<boolean | string>) => {
    switch (action.type) {
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
