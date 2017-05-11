import { AppConfig, TwitterConfig } from "../common/config";
import { getLoginStatus } from "./reducers/login_status";
import { getTweetStatusContent, getTweetStatusFlags, IStatusContent } from "./reducers/tweet_status";

function renderDefaultSuggestion(description: string) {
    chrome.omnibox.setDefaultSuggestion({
        description,
    });
}

function buildRemainingLengthMessage(tweetContent: IStatusContent): string {
    return `${TwitterConfig.STATUS_LENGTH - length} characters remaining.`;
}

function buildVersionMessage(): string {
    const version = chrome.runtime.getManifest().version;
    return `I\'m using Omnitweet for Chrome Version ${version} - ${AppConfig.URL_CHROME_WEBSTORE}`;
}

const renderSuggestion = (state: any) => {
    const loginStatus = getLoginStatus(state);
    const tweetFlags = getTweetStatusFlags(state);
    const tweetContent = getTweetStatusContent(state);

    if (tweetContent.fixed) {
        if (tweetFlags.options) {
            // navigate to options page
        } else if (loginStatus.isLoaded && !loginStatus.isLoggedIn) {
            // navigate to login page
        } else {
            // api request
        }
    } else {
        // FIXME: these messages can be created inside saga
        // user is still editing
        let message;
        if (tweetFlags.options) {
            message = "Open options page.";
        } else if (loginStatus.isLoaded && !loginStatus.isLoggedIn) {
            // show login suggestion
            message = "You need to login first. Press Enter to login.";
        } else {
            // show status preview or status length

            if (tweetFlags.version) {
                message = buildVersionMessage();
            } else if (tweetFlags.share) {
                message = tweetContent.composed;
            } else {
                message = buildRemainingLengthMessage(tweetContent);
            }
        }
        renderDefaultSuggestion(message);
    }
};

export default renderSuggestion;
