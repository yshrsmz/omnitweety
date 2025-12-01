# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Omnitweety is a Chrome extension that allows users to tweet from Chrome's Omnibox (URL bar). It uses OAuth 1.0a for Twitter authentication and is built as a Manifest V3 Chrome extension.

## Build Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Development build with hot reload
pnpm build            # Production build (runs vue-tsc then vite build)
pnpm test             # Run tests with vitest
pnpm format           # Lint and format code
```

## Required Setup

Create `apikey-release.json` in project root with Twitter API credentials:

```json
{
  "consumer_key": "YOUR_CONSUMER_KEY",
  "consumer_secret": "YOUR_CONSUMER_SECRET"
}
```

## Architecture

### Chrome Extension Structure (Manifest V3)

- **Background Service Worker** (`src/background/index.ts`): Entry point that initializes `Omnitweety` class and handles Chrome omnibox events (`onInputChanged`, `onInputEntered`)
- **Options Page** (`src/options.html`, `src/App.vue`): Vue 3 SPA for settings using Tailwind CSS and HeadlessUI

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

- Uses `@crxjs/vite-plugin` for Chrome extension bundling
- Manifest defined in `manifest.config.ts` (not static JSON)
- Development mode uses `twd` keyword; production uses `tw`
- API keys injected as `TWITTER_API_KEY` and `TWITTER_API_SECRET` globals via Vite define
