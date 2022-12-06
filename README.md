# Omnitweety

Update your Twitter status right from Chrome's Omnibox (URL bar).

https://chrome.google.com/webstore/detail/omnitweety/jkghejckpigfbolkdkplfokccgpjjilb

## Omnitweety Command

### `tw + {space/tab}`

type this command in Chrome's Omnibox to enter Omnitweety input mode. type whatever you want and hit `Enter` to tweet.

### `:share`

type this after you enter Omnitweety input mode, to share current tab's url & title.

### `:share + {space} + {comment}`

after you enter share command, you can type some comment to attach.

### `:options`

open options page

### `:version`

check omnitweety's version

## build

install dependencies.

```
$ pnpm install
```

then

```
$ pnpm dev    # development build
$ pnpm build  # production build
```

you need `apikey-release.json` in project root directory

```
{
    "consumer_key": "YOUR_CONSUMER_KEY",
    "consumer_secret": "YOUR_CONSUMER_SECRET"
}
```

## development

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
