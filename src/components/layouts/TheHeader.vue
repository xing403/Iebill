<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  back?: boolean
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
  <div
    :class="theme" flex="~ row" w="100%"
    border-b="1px dark:stone-6 light-2  solid"

    fixed left-0 top-0 z-10 mb-2 h-15 flex-items-center shadow
  >
    <svg-icon v-if="back" name="carbon:chevron-left" h-6 w-6 cursor="pointer" @click="jump" />
    <div ml-2 flex-1 text-center>
      {{ title }}
    </div>
  </div>
</template>
