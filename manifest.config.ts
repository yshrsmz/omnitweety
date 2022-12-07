import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json' assert { type: 'json' }

const { version } = packageJson

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => {
  console.log('env.mode', env.mode)
  return {
    manifest_version: 3,
    name: env.mode === 'development' ? `[DEV] Omnitweety` : 'Omnitweety',
    version: `${major}.${minor}.${patch}.${label}`,
    version_name: version,
    icons: {
      '128': 'src/assets/icon_128.png',
      '48': 'src/assets/icon_48.png',
      '16': 'src/assets/icon_16.png',
    },
    omnibox: {
      keyword: env.mode === 'development' ? 'twd' : 'tw',
    },
    options_page: 'src/options.html',
    background: {
      service_worker: 'src/background/index.ts',
      type: 'module',
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
  }
})
