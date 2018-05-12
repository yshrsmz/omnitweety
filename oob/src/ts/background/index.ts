import { OAuth } from 'oauth';
import * as TwitterText from 'twitter-text';
import { AppConfig, TwitterConfig } from '../Config';
import accessTokenRepository from '../data/AccessTokenRepository';
import tweetTemplateRepository from '../data/TweetTemplateRepository';
import SubCommands from '../SubCommands';
import {
    openNewTab,
    openOptionsPage,
    notify,
    showDefaultSuggestion,
    getCurrentPage,
    getAppVersion,
    sendSignedPostRequest,
    escapeOAuthText
} from '../Util';
import { stat } from 'fs';

class Omnitweety {

    private readonly oauth: OAuth;

    public constructor() {
        this.oauth = new OAuth(
            TwitterConfig.URL_REQUEST_TOKEN,
            TwitterConfig.URL_ACCESS_TOKEN,
            TwitterConfig.API_KEY,
            TwitterConfig.API_SECRET,
            '1.0A',
            null,
            'HMAC-SHA1'
        );

        if (!accessTokenRepository.isAuthorized()) {
            openOptionsPage();
        }
        this.handleEvents();
    }

    private isShareCommand(text: string): boolean{
        return SubCommands.share.regex.test(text) || SubCommands.share.textRegex.test(text);
    }

    private isOptionsCommand(text: string): boolean {
        return SubCommands.options.regex.test(text);
    }

    private isVersionCommand(text: string): boolean {
        return SubCommands.version.regex.test(text);
    }

    private getShareCommandRegex(): RegExp {
        return SubCommands.share.textRegex;
    }

    private getUserInputContent(text: string, regex: RegExp) {
        let ary = regex.exec(text);
        // return first match or null
        if (ary && ary.length > 1) {
            return ary[1];
        } else {
            return null;
        }
    }

    private getVersionString() {
        return `I'm using Omnitweety for Chrome Version ${getAppVersion()} - ${AppConfig.URL_CHROME_WEBSTORE}`;
    }

    private handleEvents() {
        this.handleInputChangedEvent();
        this.handleInputEnteredEvent();
    }

    private handleInputChangedEvent() {
        chrome.omnibox.onInputChanged.addListener((text: string) => {
            if (!accessTokenRepository.isAuthorized()) {
                showDefaultSuggestion('To use Omnitweety, login to twitter first(press Enter to login)');
                return;
            }
            if (this.isShareCommand(text)) {
                getCurrentPage().then((page: chrome.tabs.Tab) => {
                    let template = tweetTemplateRepository.get();
                    let message = 'unable to share this page';
                    let maxUrlLengh = TwitterConfig.URL_LENGTH;
                    if (page) {
                        message = template.buildTweet(
                            this.getUserInputContent(text, this.getShareCommandRegex()),
                            page.title,
                            page.url);
                    }

                    showDefaultSuggestion(message);
                });
            } else if (this.isOptionsCommand(text)) {
                showDefaultSuggestion('Open options page');
            } else if (this.isVersionCommand(text)) {
                showDefaultSuggestion(this.getVersionString());
            } else {
                let lengthInfo = TwitterText.parseTweet(text);
                let message = `${280 - lengthInfo.weightedLength} characters remaining.`;
                showDefaultSuggestion(message);
            }
        });
    }

    private handleInputEnteredEvent() {
        chrome.omnibox.onInputEntered.addListener((text: string) => {
            if (!accessTokenRepository.isAuthorized()) {
                openOptionsPage();
                return;
            }
            if (this.isShareCommand(text)) {
                getCurrentPage().then((page: chrome.tabs.Tab) => {
                    let template = tweetTemplateRepository.get();
                    let message = template.buildTweet(
                        this.getUserInputContent(text, this.getShareCommandRegex()),
                        page.title,
                        page.url);

                    this.postStatus(message);
                });
            } else if (this.isOptionsCommand(text)) {
                openOptionsPage();
            } else if (this.isVersionCommand(text)) {
                this.postStatus(this.getVersionString());
            } else {
                this.postStatus(text);
            }
        });
    }

    private postStatus(message: string) {
        let token = accessTokenRepository.get();
        sendSignedPostRequest<TweetResponse>(this.oauth, {
            url: `${TwitterConfig.URL_STATUS_UPDATE}?status=${escapeOAuthText(message)}`,
            oauthToken: token,
            body: null,
            contentType: 'text/plain'
        })
            .then((res) => {
                notify(res.user.profile_image_url_https, res.user.name, res.text);
            })
            .catch((e) => {
                console.log(e);
                let actual = JSON.parse(e.data);
                notify('./assets/icon_128.png', 'Oops! There was an error.', actual.errors[0].message);
            });
    }
}

interface TweetResponse {
    user: {
        profile_image_url_https: string;
        name: string;
    };
    text: string;
}

new Omnitweety();
