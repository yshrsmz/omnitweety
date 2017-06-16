import { IPayloadAction } from "../../common/actions";
import * as Actions from "../actions";
import AccessToken from "../../data/access_token";

export interface ITwitter {
    loaded: boolean;
    authorized: boolean;
    name: string;
    screenName: string;
    profileImageUrl: string;
}

const initialState: ITwitter = {
    loaded: false,
    authorized: false,
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
