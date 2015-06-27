'use strict';

let oauth = ChromeExOAuth.initBackgroundPage({
    'request_url': 'https://api.twitter.com/oauth/request_token',
    'authorize_url': 'https://api.twitter.com/oauth/authorize',
    'access_url': 'https://api.twitter.com/oauth/access_token',
    'consumer_key': TwitterAPIKey.consumer_key,
    'consumer_secret': TwitterAPIKey.consumer_secret,
    'scope': 'https://api.twitter.com/1.1/statuses/update.json',
    'app_name': 'Omnitweety'
});

let notify = (iconUrl, title, message) => {
    chrome.notifications.create('omnitweety', {
        type: 'basic',
        iconUrl: iconUrl,
        title: title,
        message: message
    }, (id) => {
        window.setTimeout(() => {
            chrome.notifications.clear(id, function () {
            });
        }, 3000);
    });
};

oauth.authorize(() => {
    chrome.omnibox.onInputChanged.addListener((text) => {
        chrome.omnibox.setDefaultSuggestion({
            description: `${140 - text.length} characters remaining.`
        });
    });

    chrome.omnibox.onInputEntered.addListener((text) => {
        let url = 'https://api.twitter.com/1.1/statuses/update.json';
        let request = {
            method: 'POST',
            parameters: {
                status: text
            }
        };

        oauth.sendSignedRequest(
            url,
            (response, xhr) => {
                let result = JSON.parse(response);
                if (result.errors !== undefined) {
                    notify('./assets/icon_128.png', 'Oops! There was an error.', result.errors[0].message);
                } else {
                    notify(result.user.profile_image_url_https, result.user.name,
                        result.text);
                }
            },
            request);
    })
});
