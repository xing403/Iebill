import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    dts: true,
    dirs: [
      './src/composables',
      './src/components',
    ],
    vueTemplate: true,
  })
}
