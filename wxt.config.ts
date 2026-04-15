import { defineConfig } from 'wxt'
import path from 'node:path'
import apikeys from './apikey-release.json' with { type: 'json' }

// https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  manifestVersion: 3,
  imports: false,
  manifest: ({ mode }) => ({
    name: mode === 'development' ? '[DEV] Omnitweety' : 'Omnitweety',
    omnibox: {
      keyword: mode === 'development' ? 'twd' : 'tw',
    },
    permissions: ['tabs', 'notifications', 'storage'],
    host_permissions: [
      'https://api.twitter.com/',
      'https://abs.twimg.com/',
      'https://pbs.twimg.com/',
      'http://fonts.googleapis.com/',
    ],
    content_security_policy: {
      extension_pages:
        "script-src 'self'; object-src 'self'; img-src 'self' https://abs.twimg.com/ https://pbs.twimg.com/",
    },
  }),
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  vite: () => ({
    define: {
      TWITTER_API_KEY: JSON.stringify(apikeys.consumer_key),
      TWITTER_API_SECRET: JSON.stringify(apikeys.consumer_secret),
    },
  }),
})
