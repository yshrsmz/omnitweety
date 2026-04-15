# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Omnitweety is a Chrome extension that allows users to tweet from Chrome's Omnibox (URL bar). It uses OAuth 1.0a for Twitter authentication and is built as a Manifest V3 Chrome extension.

## Build Commands

```bash
pnpm install                      # Install dependencies (runs `wxt prepare` in postinstall)
pnpm dev                          # Development build with hot reload (WXT)
pnpm build                        # Production build (runs vue-tsc then `wxt build`)
pnpm zip                          # Production build + zip for store upload
pnpm test                         # Run tests with vitest (watch mode)
pnpm test -- run path/to/file     # Run a single test file once
pnpm lint                         # Lint only (no fixes)
pnpm format                       # Lint --fix and prettier write
```

WXT output lands in `.output/<browser>-mv3/` (e.g. `.output/chrome-mv3/`). Legacy crxjs output (`dist/`) is no longer produced.

Vitest stubs `TWITTER_API_KEY`/`TWITTER_API_SECRET` via `vitest.config.ts`, so tests run without `apikey-release.json`.

## Required Setup

Create `apikey-release.json` in project root with Twitter API credentials:

```json
{
  "consumer_key": "YOUR_CONSUMER_KEY",
  "consumer_secret": "YOUR_CONSUMER_SECRET"
}
```

## Architecture

### Chrome Extension Structure (Manifest V3, WXT entrypoints)

- **Background Service Worker** (`src/entrypoints/background.ts`): `defineBackground({ type: 'module', main })` — all Chrome listener registration MUST live inside `main()` (WXT imports the file under Node during build; top-level runtime code will break).
- **Options Page** (`src/entrypoints/options/index.html` + `main.ts` + `../../App.vue`): Vue 3 SPA for settings using Tailwind CSS and HeadlessUI. `open_in_tab: true` is set via `<meta name="manifest.open_in_tab">` so the options page opens in a full tab, matching the legacy `options_page` behavior.

### Key Components

**Omnibox Command System** (`src/background/`):

- `Omnitweety.ts`: Main controller handling tweet posting and omnibox input
- `SubCommands.ts`: Extensible command system for `:share`, `:options`, `:version` commands

**OAuth Authentication** (`src/auth/`):

- `AuthFlow.ts`: OAuth 1.0a PIN-based flow for Twitter
- `OAuthHeader.ts`: Generates signed OAuth headers
- `signing.ts`: HMAC-SHA1 signature generation

**Data Layer** (`src/data/`):

- `ConfigDataSource.ts`: Chrome storage abstraction with migration support
- Repository pattern: `AccessTokenRepository`, `TweetTemplateRepository`, `AmazonAssociateRepository`

### Build Configuration

- Uses [WXT](https://wxt.dev) (`wxt.config.ts`) for Chrome extension bundling. Auto-imports are disabled (`imports: false`) — import `defineBackground` etc. explicitly from `wxt/utils/define-background`.
- Manifest is generated from `wxt.config.ts` `manifest: ({ mode }) => ({ ... })`; `version`/`version_name` come from `package.json`.
- Development mode uses `twd` omnibox keyword and `[DEV] Omnitweety` name; production uses `tw` / `Omnitweety`.
- API keys injected as `TWITTER_API_KEY` and `TWITTER_API_SECRET` globals via Vite `define` (forwarded through `wxt.config.ts` `vite:` hook).
