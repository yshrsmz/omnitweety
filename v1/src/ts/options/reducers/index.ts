import { combineReducers } from "redux";
import prefix, { IPrefix } from "./prefix";
import slack, { ISlack } from "./slack";
import twitter, { ITwitter } from "./twitter";

const options = combineReducers({
    prefix,
    slack,
    twitter,
});

export const getPrefix = (state: any): IPrefix => state.prefix;
export const getSlack = (state: any): ISlack => state.slack;
export const getTwitter = (state: any): ITwitter => state.twitter;

export { IPrefix } from "./prefix";
export { ISlack } from "./slack";
export { ITwitter } from "./twitter";
export default options;
