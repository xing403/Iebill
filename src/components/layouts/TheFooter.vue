<script setup lang="ts">
const route = useRoute()
const nav = ref([{
  name: '首页',
  icon: 'carbon:home',
  url: '/',
}, {
  name: '列表',
  icon: 'carbon:align-box-top-left',
  url: '/list',
}, {
  name: '统计',
  icon: 'carbon:chart-pie',
  url: '/statistics',
}, {
  name: '设置',
  icon: 'carbon:settings',
  url: '/settings',
}])

const router = useRouter()

function jump(url: string | number) {
  if (typeof url == 'string' && url !== 'back') {
    router.replace({
      path: url,
    })
  }
  else if (url === 'back' || url === -1) {
    router.back()
  }
}
</script>

<template>
  <div
    :class="theme" class="footer" flex="~ row" fixed bottom-0 h-15 w="100%" justify-around flex-items-center
    border-t="1px dark:color-hex-414243 color-hex-E4E7ED" text-center
  >
    <div
      v-for="item, index in nav" :key="index" :href="item.url" w="20%" flex="~ col" cursor-pointer flex-items-center
      :class="{ active: route.path === item.url }" @click="jump(item.url)"
    >
      <svg-icon :name="item.icon" h-6 w-6 />
      <div h-6>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
