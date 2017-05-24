import { combineReducers } from "redux";
import prefix, { IPrefix } from "./prefix";

const options = combineReducers({
    prefix,
});

export const getPrefix = (state: any): IPrefix => state.prefix;

export { IPrefix } from "./prefix";
export default { options };
