import { IPayloadAction } from "../../common/actions";
import AccessToken from "../../data/access_token";
import * as TwitterActions from "../actions/twitter";

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
        case TwitterActions.ACCOUNT_INITIAL_DATA_LOADED:
            return {
                ...state,
                ...action.payload,
                loaded: true,
            };
        default:
            return state;
    }
};

export default twitter;
