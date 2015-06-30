'use strict';

class OmniTweety {

    url = 'https://api.twitter.com/1.1/statuses/update.json';

    constructor() {
        this.oauth = this.initBackgroundPage();

        this.oauth.authorize(this.handleEvents.bind(this));
    }

    initBackgroundPage() {
        return ChromeExOAuth.initBackgroundPage({
            'request_url': 'https://api.twitter.com/oauth/request_token',
            'authorize_url': 'https://api.twitter.com/oauth/authorize',
            'access_url': 'https://api.twitter.com/oauth/access_token',
            'consumer_key': TwitterAPIKey.consumer_key,
            'consumer_secret': TwitterAPIKey.consumer_secret,
            'scope': 'https://api.twitter.com/1.1/statuses/update.json',
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

    handleEvents() {
        chrome.omnibox.onInputChanged.addListener((text) => {
            chrome.omnibox.setDefaultSuggestion({
                description: `${140 - text.length} characters remaining.`
            });
        });

        chrome.omnibox.onInputEntered.addListener(this.postStatus.bind(this));
    }

    postStatus(text) {

        let request = {
            method: 'POST',
            parameters: {
                status: text
            }
        };

        this.oauth.sendSignedRequest(this.url, (response, xhr) => {
            let result = JSON.parse(response);

            if (result.errors != undefined) {
                notify('./assets/icon_128.png', 'Oops! There was an error.', result.errors[0].message);
            } else {
                notify(result.user.profile_image_url_https, result.user.name, result.text);
            }
        }, request);
    }
}

new OmniTweety();
