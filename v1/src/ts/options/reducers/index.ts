import { combineReducers } from "redux";
import prefix, { IPrefix } from "./prefix";
import slack, { ISlack } from "./slack";

const options = combineReducers({
    prefix,
    slack,
});

export const getPrefix = (state: any): IPrefix => state.prefix;
export const getSlack = (state: any): ISlack => state.slack;

export { IPrefix } from "./prefix";
export { ISlack } from "./slack";
export default { options };
