import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSvgIcon from './svg-icon'
import createMock from './mock'
import createPages from './pages'
import createUnocss from './unocss'

export default function createVitePlugins(viteEnv: any) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
  ]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSvgIcon())
  vitePlugins.push(createMock(viteEnv))
  vitePlugins.push(createPages())
  vitePlugins.push(createUnocss())
  return vitePlugins
}
