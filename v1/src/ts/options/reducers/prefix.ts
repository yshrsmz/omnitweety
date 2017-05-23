import * as Actions from "../home/actions";
import { IPayloadAction } from "../../common/actions";
import { AppConfig } from "../../common/config";

export interface IPrefix {
    prefix: string;
}

const initialPrefix = {
    prefix: AppConfig.PREFIX,
};

const prefix = (state: IPrefix = initialPrefix, action: IPayloadAction<string>) => {
    switch(action.type) {
        case Actions.PREFIX_UPDATED:
            return {
                ...state,
                prefix: action.payload,
            };
        default:
            return state;
    }
};

export default prefix;
