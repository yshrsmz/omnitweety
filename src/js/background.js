'use strict';

import request from 'superagent';

import TwitterText from 'twitter-text';
import TwitterAPIKey from '../../apikey.js';
import AppConstants from './options/constants/app-constants';
import ConfigStore from './options/stores/config-store';

let {Values} = AppConstants;

class OmniTweety {

    static get URL_UPDATE() {
        return Values.URL_UPDATE;
    }

    static get URL_CONFIG() {
        return Values.URL_CONFIG;
    }

    static get shareCommandRegExp() {
        return /^:share(\s*|\s+[\w\W]*)$/;
    }

    static get shareTextRegExp() {
        return /^:share\s+([\w\W]+)$/;
    }

    static get optionsCommandRegExp() {
        return /^:options(\s*|\s+[\w\W]*)$/;
    }

    static get versionCommandRegExp() {
        return /^:version(\s*|\s+[\w\W]*)$/;
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

    isShareCommand(text) {
        return OmniTweety.shareCommandRegExp.test(text);
    }

    isOptionsCommand(text) {
        return OmniTweety.optionsCommandRegExp.test(text);
    }

    isVersionCommand(text) {
        return OmniTweety.versionCommandRegExp.test(text);
    }

    getShareUserContent(text) {
        let ary = OmniTweety.shareTextRegExp.exec(text);
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
            if (this.isShareCommand(text)) {
                this.getCurrentPage((page) => {
                    let message = 'unable to share this page';
                    this.getShortUrlMaxLength((urlMaxLength = page.url.length) => {
                        if (page) {
                            message = this.buildShareText(
                                this.getShareUserContent(text) || ConfigStore.getStatusPrefix(),
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
                chrome.omnibox.setDefaultSuggestion({
                    description: `${140 - text.length} characters remaining.`
                });
            }
        });

        chrome.omnibox.onInputEntered.addListener((text) => {
            if (this.isShareCommand(text)) {

                this.getCurrentPage((page) => {
                    this.getShortUrlMaxLength((maxLength = page.url.length) => {
                        let sendMessage = this.buildShareText(
                            this.getShareUserContent(text) || ConfigStore.getStatusPrefix(),
                            page.title,
                            page.url,
                            maxLength);

                        this.postMessage(sendMessage);
                    });
                });
            } else if (this.isOptionsCommand(text)) {
                chrome.runtime.openOptionsPage(null);
            } else if (this.isVersionCommand(text)) {
                this.postMessage(this.getVersionString());
            } else {
                this.postMessage(text);
            }
        });
    }

    postMessage(text) {
        this.postStatus(text);
        this.postSlack(text);
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

    postSlack(text) {
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
