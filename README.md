# ⚡ Vite plugin for Zalo Mini App

## How to setup?

### 1. Install
```bash
pnpm add -D vite-plugin-zalo-mini-app
```

If you don't have `zmp-cli` installed, you can install it by running:

```bash
pnpm add -g zmp-cli
```

(This example uses `pnpm`, you can use `npm` or `yarn`,...)

### 2. Update your `vite.config.ts`
```typescript

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import zaloMiniApp from 'vite-plugin-zalo-mini-app'

export default () => {
  return defineConfig({
    plugins: [
      react(), // If you are using React
      splitVendorChunkPlugin(), // If you want to split vendor chunk to reduce the size of the main bundle
      zaloMiniApp({
        app: {
          title: 'Mini App Name',
          headerTitle: 'Mini App Name',
          headerColor: '#F25730',
          textColor: 'black',
          statusBar: 'normal',
          actionBarHidden: true,
          hideAndroidBottomNavigationBar: true,
          hideIOSSafeAreaBottom: true,
        },
      }),
    ],
  })
}
```

> Because this plugin will automatic generate `app-config.json` for you with the configuration you provided in `vite.config.ts`. So if you have `app-config.json` in your project, you should remove it.

### 3. Update your `package.json`

```json
{
  "scripts": {
    "start": "vite dev",
    "build": "tsc && vite build",
    "deploy:dev": "zmp-cli deploy --existing",
    "deploy:testing": "zmp-cli deploy --existing --testing",
  }
}
```

## Run & deploy

- 🔥 `pnpm start` to start local development server
- 🚀 `pnpm build` to build your project
- 🚢 `pnpm deploy` to deploy the app in **DEVELOPMENT** mode
- ⚡ `pnpm deploy:testing` to deploy the app in **TESTING** mode
