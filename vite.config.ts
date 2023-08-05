/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: env.VITE_OPEN_PROXY === 'true',
          rewrite: path => path.replace(/\/api/, ''),
        },
      },
    },
    plugins: createVitePlugins(env),
  })
}
