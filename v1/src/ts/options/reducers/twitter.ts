import { IPayloadAction } from "../../common/actions";
import * as Actions from "../actions";

export interface ITwitter {
    loaded: boolean;
    name: string;
    screenName: string;
    profileImageUrl: string;
}

const initialState: ITwitter = {
    loaded: false,
    name: "",
    screenName: "",
    profileImageUrl: "",
};

const twitter = (state: ITwitter = initialState, action: IPayloadAction<any>) => {
    switch (action.type) {
        case Actions.TWITTER_INITIAL_DATA_LOADED:
            return {
                ...state,
                loaded: true,
            };
        default:
            return state;
    }
};

export default twitter;
