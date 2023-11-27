<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string | any
  back?: boolean | any
}>(), {
  title: '未命名',
  back: true,
})
const router = useRouter()
function jump() {
  router.back()
}
const title = toRef(props, 'title')
const back = toRef(props, 'back')
</script>

<template>
  <div :class="theme" flex="~ row" h-15 flex-items-center border-b="1px dark:color-hex-414243 color-hex-E4E7ED">
    <svg-icon v-if="back" ml-2 name="carbon:chevron-left" h-6 w-6 cursor="pointer" @click="jump" />
    <div ml-2 flex-1 text-center>
      {{ title }}
    </div>
  </div>
</template>
