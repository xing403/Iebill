<script setup lang="ts">
const nav = ref([{
  name: '首页',
  icon: 'carbon:home',
  url: '/',
}, {
  name: '账单列表',
  icon: 'carbon:align-box-top-left',
  url: '/list',
}, {
  name: '账单统计',
  icon: 'carbon:chart-pie',
  url: '/statistics',
}, {
  name: '设置',
  icon: 'carbon:settings',
  url: '/settings',
}])
</script>

<template>
  <div :class="theme" class="sidebar" h-full>
    <el-menu router :default-active="$router.currentRoute.value.fullPath">
      <el-menu-item v-for="item, index in nav" :key="index" :index="item.url">
        <el-icon><svg-icon :name="item.icon" /></el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
