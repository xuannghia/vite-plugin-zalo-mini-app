## Install
```bash
pnpm add -D vite-plugin-zalo-mini-app
```

## Usage - `vite.config.ts`
```typescript

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import zaloMiniApp from 'vite-plugin-zalo-mini-app'

export default () => {
  return defineConfig({
    base: '',
    plugins: [
      react(),
      splitVendorChunkPlugin(),
      miniApp({
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