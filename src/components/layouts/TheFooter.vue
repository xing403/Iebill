<script setup lang="ts">
const route = useRoute()
const nav = ref([{
  name: '首页',
  icon: 'carbon:home',
  url: '/',
}, {
  name: '详情',
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

function jump(url: string) {
  if (typeof url == 'string' && url !== 'back') {
    router.push({
      path: url,
    })
  }
  else if (url === 'back' || url === -1) {
    router.back()
  }
}
</script>

<template>
  <div :class="theme" class="footer" flex="~ row" fixed bottom-0 h-15 w="100%" justify-around flex-items-center text-center>
    <div
      v-for="item, index in nav" :key="index"
      :href="item.url" w="20%" flex="~ col" flex-items-center
      @click="jump(item.url)"
      cursor-pointer
      :class="{active: route.path == item.url}"
    >
      <svg-icon :name="item.icon" h-6 w-6 />
      <div h-6>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
