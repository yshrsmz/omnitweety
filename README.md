Omnitweety
===

Update your Twitter status right from Chrome's Omnibox (URL bar).

https://chrome.google.com/webstore/detail/omnitweety/jkghejckpigfbolkdkplfokccgpjjilb

# Omnitweety Command

## `tw + {space/tab}`
type this command in Chrome's Omnibox to enter Omnitweety input mode. type whatever you want and hit `Enter` to tweet.

## `:share`
type this after you enter Omnitweety input mode, to share current tab's url & title.

## `:share + {space} + {comment}`
after you enter share command, you can type some comment to attach.

## `:options`
open options page

## `:version`
check omnitweety's version


# build

install dependencies.

```
npm install -g gulp
npm install .
```

then

```
gulp build                  # for development
gulp build --production     # for production
```

you need `apikey.js` in project root directory

```
export default {
    "consumer_key": "YOUR_CONSUMER_KEY",
    "consumer_secret": "YOUR_CONSUMER_SECRET"
};
```
