## Install
```bash
pnpm add -D vite-plugin-zalo-mini-app
```

## Update your `vite.config.ts`
```typescript

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import zaloMiniApp from 'vite-plugin-zalo-mini-app'

export default () => {
  return defineConfig({
    plugins: [
      react(),
      splitVendorChunkPlugin(),
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