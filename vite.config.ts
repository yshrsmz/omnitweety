import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'
import apikeys from './apikey-release.json' with { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    TWITTER_API_KEY: JSON.stringify(apikeys.consumer_key),
    TWITTER_API_SECRET: JSON.stringify(apikeys.consumer_secret),
  },
  plugins: [vue(), crx({ manifest: manifest })],
  resolve: {
    alias: {
      buffer: 'buffer',
      // crypto: 'crypto-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      stream: 'stream-browserify',
      url: 'url',
    },
  },
})
