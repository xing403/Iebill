<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const props = withDefaults(defineProps<{
  title?: string
  back?: boolean
}>(), {
  title: '未命名',
  back: true,
})
const payId = ref(route.query.id)
function jump() {
  router.back()
  console.log(payId)
}
const title = toRef(props, 'title')
const back = toRef(props, 'back')
</script>

<template>
  <div z-10 :class="theme" flex="~ row" w="100%" 
  border-b="1px dark:stone-6 light-2  solid" fixed 
  left-0 top-0 h-15
    flex-items-center mb-2 shadow>
    <svg-icon v-if="back" name="carbon:chevron-left" h-6 w-6 @click="jump" cursor="pointer" />
    <div ml-2 text-center flex-1>
      {{ title }}
    </div>
  </div>
</template>
