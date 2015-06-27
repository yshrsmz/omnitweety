Omnitweety
===

Update your Twitter status right from Chrome's Omnibox (URL bar).

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
var TwitterAPIKey = {
    "consumer_key": "CONSUMER_KEY",
    "consumer_secret": "CONSUMER_SECRET"
};
```
