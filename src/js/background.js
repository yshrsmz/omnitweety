'use strict';

import request from 'superagent';

import TwitterText from 'twitter-text';
import TwitterAPIKey from '../../apikey.js';
import AppConstants from './options/constants/app-constants';
import ConfigStore from './options/stores/config-store';
import SubCommands from './sub-commands';

let {Values} = AppConstants;

class OmniTweety {

    static get URL_UPDATE() {
        return Values.URL_UPDATE;
    }

    static get URL_CONFIG() {
        return Values.URL_CONFIG;
    }

    constructor() {
        this.oauth = this.initBackgroundPage();

        this.oauth.authorize(this.handleEvents.bind(this));
    }

    initBackgroundPage() {
        return ChromeExOAuth.initBackgroundPage({
            'request_url': Values.URL_REQUEST_TOKEN,
            'authorize_url': Values.URL_AUTHORIZE,
            'access_url': Values.URL_ACCESS_TOKEN,
            'consumer_key': TwitterAPIKey.consumer_key,
            'consumer_secret': TwitterAPIKey.consumer_secret,
            'scope': Values.OAUTH_SCOPE,
            'app_name': 'Omnitweety'
        });
    }

    notify(iconUrl, title, message) {
        chrome.notifications.create('omnitweety', {
            type: 'basic',
            iconUrl: iconUrl,
            title: title,
            message: message
        }, (id) => {
            window.setTimeout(() => {
                chrome.notifications.clear(id, () => {
                });
            }, 3000);
        });
    }


    isSlackCommand(text) {
        return SubCommands.sl.regex.test(text) || SubCommands.sl.textRegex.test(text);
    }

    isTweetCommand(text) {
        return SubCommands.tw.regex.test(text) || SubCommands.tw.textRegex.test(text);
    }

    isShareCommand(text) {
        return SubCommands.share.regex.test(text) || SubCommands.share.textRegex.test(text);
    }

    isShareSlackCommand(text) {
        return SubCommands.sharesl.regex.test(text) || SubCommands.sharesl.textRegex.test(text);
    }

    isShareTwitterCommand(text) {
        return SubCommands.sharetw.regex.test(text) || SubCommands.sharetw.textRegex.test(text);
    }

    isOptionsCommand(text) {
        return SubCommands.options.regex.test(text);
    }

    isVersionCommand(text) {
        return SubCommands.version.regex.test(text);
    }

    isAnyShareCommand(text) {
        return this.isShareCommand(text) || this.isShareSlackCommand(text) || this.isShareTwitterCommand(text);
    }

    getShareCommandRegex(text) {
        if (this.isShareCommand(text)) {
            return SubCommands.share.textRegex;
        } else if (this.isShareTwitterCommand(text)) {
            return SubCommands.sharetw.textRegex;
        } else {
            return SubCommands.sharesl.textRegex;
        }
    }

    getUserInputContent(text, regex) {
        let ary = regex.exec(text);
        // return first match or null
        if (ary && ary.length > 1) {
            return ary[1];
        } else {
            return null;
        }
    }

    /**
     * get current page's title & url
     */
    getCurrentPage(cb) {
        chrome.tabs.query({active: true, currentWindow: true}, (pages) => {
            if (pages.length > 0) {
                cb(pages[0]);
            } else {
                cb(null);
            }
        });
    }

    getVersionString() {
        return `I\'m using Omnitweety for Chrome Version ${chrome.app.getDetails().version} - ${Values.URL_WEBSTORE}`;
    }

    handleEvents() {
        chrome.omnibox.onInputChanged.addListener((text) => {
            if (this.isAnyShareCommand(text)) {
                this.getCurrentPage((page) => {
                    let message = 'unable to share this page';
                    this.getShortUrlMaxLength((urlMaxLength = page.url.length) => {
                        if (page) {
                            message = this.buildShareText(
                                this.getUserInputContent(text, this.getShareCommandRegex(text)) || ConfigStore.getStatusPrefix(),
                                page.title,
                                page.url,
                                urlMaxLength);
                        }

                        chrome.omnibox.setDefaultSuggestion({
                            description: this.escapeText(message)
                        });
                    });
                });
            } else if (this.isOptionsCommand(text)) {
                chrome.omnibox.setDefaultSuggestion({
                    description: 'Open options page'
                });
            } else if (this.isVersionCommand(text)) {
                chrome.omnibox.setDefaultSuggestion({
                    description: this.getVersionString()
                });
            } else {
                let sendMessage;
                if (this.isSlackCommand(text)) {
                    sendMessage = this.getUserInputContent(text, SubCommands.sl.textRegex);
                } else if (this.isTweetCommand(text)) {
                    sendMessage = this.getUserInputContent(text, SubCommands.tw.textRegex);
                } else {
                    sendMessage = text;
                }
                let message = `${140 - sendMessage.length} characters remaining.`;
                chrome.omnibox.setDefaultSuggestion({
                    description: message
                });
            }
        });

        chrome.omnibox.onInputEntered.addListener((text) => {
            if (this.isAnyShareCommand(text)) {

                this.getCurrentPage((page) => {
                    this.getShortUrlMaxLength((maxLength = page.url.length) => {
                        let sendMessage = this.buildShareText(
                            this.getUserInputContent(text, this.getShareCommandRegex(text)) || ConfigStore.getStatusPrefix(),
                            page.title,
                            page.url,
                            maxLength);

                        if (this.isShareSlackCommand(text)) {
                            this.postSlack(sendMessage, true);
                        } else if (this.isShareTwitterCommand(text)) {
                            this.postStatus(sendMessage);
                        } else {
                            this.postMessage(sendMessage);
                        }
                    });
                });
            } else if (this.isOptionsCommand(text)) {
                chrome.runtime.openOptionsPage(null);

            } else if (this.isVersionCommand(text)) {
                this.postMessage(this.getVersionString());

            } else if (this.isSlackCommand(text)) {
                this.postSlack(this.getUserInputContent(text, SubCommands.sl.textRegex), true);

            } else if (this.isTweetCommand(text)) {
                this.postStatus(this.getUserInputContent(text, SubCommands.tw.textRegex));

            } else {
                this.postMessage(text);
            }
        });
    }

    postMessage(text) {
        this.postStatus(text);
        this.postSlack(text, false);
    }

    postStatus(text) {

        let request = {
            method: 'POST',
            parameters: {
                status: text
            }
        };

        this.oauth.sendSignedRequest(OmniTweety.URL_UPDATE, (response, xhr) => {
            let result = JSON.parse(response);

            if (result.errors != undefined) {
                this.notify('./assets/icon_128.png', 'Oops! There was an error.', result.errors[0].message);
            } else {
                this.notify(result.user.profile_image_url_https, result.user.name, result.text);
            }
        }, request);
    }

    postSlack(text, shouldNotify) {
        if (!ConfigStore.useSlack()) {
            return;
        }
        let data = {
            token: ConfigStore.getSlackToken(),
            channel: ConfigStore.getSlackRoom(),
            text: text,
            as_user: true
        };

        request.get(Values.URL_SLACK_POST_MESSAGE)
            .query(data)
            .end((err, res) => {
                console.log('send to slack', err, res);
                if (!shouldNotify) {
                    return;
                }

                if (err) {
                    this.notify('./assets/icon_128.png', 'Oops! There was an error.', err.message);
                } else {
                    this.notify('./assets/icon_128.png', 'Successfully posted to Slack', text);
                }
            });
    }

    getTwitterConfig(cb) {
        let request = {
            method: 'POST'
        };

        let lastUpdatedAt = localStorage['twitter_config_last_updated_at'];
        let config = localStorage['twitter_config'];

        lastUpdatedAt = lastUpdatedAt ? +lastUpdatedAt : 0;

        if (new Date().getTime() - lastUpdatedAt > 86400000 || !config) {
            this.oauth.sendSignedRequest(OmniTweety.URL_CONFIG, (response, xhr) => {
                localStorage['twitter_config'] = response;
                localStorage['twitter_config_last_updated_at'] = new Date().getTime();

                cb(JSON.parse(response));
            });
        } else {
            cb(JSON.parse(config));
        }
    }

    getShortUrlMaxLength(cb) {
        this.getTwitterConfig((config) => {
            if (!config) {
                cb(null);
            } else {
                cb(config.short_url_length_https);
            }
        });
    }

    buildShareText(prefix, title, url, urlMaxLength) {
        let baseMessage = `${prefix} ${title} `;
        let urlsInBaseMessage = TwitterText.extractUrls(baseMessage);
        let urlsCount = urlsInBaseMessage.length + 1;
        let urlsLengthInBaseMessage = 0;

        urlsInBaseMessage.forEach((item) => {
            urlsLengthInBaseMessage += item.length;
        });

        let lengthDiff = 140 - ((baseMessage.length - urlsLengthInBaseMessage) + urlMaxLength * urlsCount);

        if (lengthDiff < 0) {
            title = title.slice(0, lengthDiff);
        }

        return `${prefix} ${title} ${url}`;
    }

    escapeText(text) {
        return text.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, "&apos;")
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}

new OmniTweety();
