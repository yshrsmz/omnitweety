import { defineConfig } from 'vitest/config'

export default defineConfig({
  define: {
    TWITTER_API_KEY: JSON.stringify('twitter-api-key'),
    TWITTER_API_SECRET: JSON.stringify('twitter-api-secret'),
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
