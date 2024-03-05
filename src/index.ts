import fs from 'fs'

import { Plugin } from 'vite'

export default function zaloMiniApp() {
  const config: Plugin = {
    name: 'vite-plugin-zalo-mini-app',
    config(config) {
      return {
        build: {
          target: config.build?.target || 'es2015',
          cssTarget: config.build?.cssTarget || ['es2015', 'safari13.1'],
          rollupOptions: {
            ...config.build?.rollupOptions,
            output: {
              entryFileNames: 'assets/[name].[hash].module.js',
              chunkFileNames: 'assets/[name].[hash].module.js',
              ...config.build?.rollupOptions?.output,
            },
            plugins: [
              ...[config.build?.rollupOptions?.plugins] || [],
              {
                name: 'vite-plugin-zalo-mini-app',
                writeBundle(options, bundle) {
                  type Output = typeof output[0];
                  type OutputChunk = Output & { isEntry: boolean; imports: string[] };
                  const output = Object.values(bundle)
                  const outputMap = new Map<string, Output>();
                  output.forEach((obj) => {
                    outputMap.set(obj.fileName, obj);
                  });
                  // Entry files, cần đc load sync bằng thẻ script
                  const jsFiles = output.filter((file) => {
                    return file.type === 'chunk' && file.isEntry;
                  }) as OutputChunk[];
                  // Các file cần preload
                  const modulePreloadFiles: Output[] = [];
                  const getImportedChunks = (chunk: OutputChunk, seen = new Set()) => {
                    const chunks: OutputChunk[] = [];
                    chunk.imports.forEach((file) => {
                      const importee = outputMap.get(file);
                      if (importee?.type === 'chunk' && !seen.has(file)) {
                        seen.add(file);
                        chunks.push(...getImportedChunks(importee, seen));
                        chunks.push(importee);
                      }
                    });
                    return chunks;
                  };
                  jsFiles.forEach((file) => {
                    const chunks = getImportedChunks(file);
                    modulePreloadFiles.push(...chunks);
                  });
      
                  const cssFiles = output.filter((file) => {
                    if (file.type !== 'asset' || !file.fileName.endsWith('.css'))
                      return false;
                    return true;
                  });
                  const appConfigJson = {
                    listCSS: [
                      ...cssFiles.map((f) => f.fileName),
                    ],
                    listSyncJS: [
                      ...jsFiles.map((f) => f.fileName),
                    ],
                    listAsyncJS: [
                      ...modulePreloadFiles.map((f) => f.fileName),
                    ],
                  }
                  fs.writeFileSync(`${options.dir}/app-config.json`,
                    JSON.stringify(appConfigJson)
                  );
                },
              }
            ]
          }
        }
      }
    },
  }
  return config
}