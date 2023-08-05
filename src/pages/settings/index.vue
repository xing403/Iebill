<script setup lang="ts">
const mode = ref(theme.value == 'dark')
function handleTheme(value: boolean) {
  theme.value = value ? 'dark' : 'light'
}
</script>

<template>
  <the-header :back="false" title="设置" />
  <the-content pb-15 pl-1 pr-1 pt-60px>
    <el-card shadow="always">
      <div flex="~ row" justify-between>
        <div>暗夜模式</div>
        <el-switch v-model="mode" @change="handleTheme" />
      </div>
    </el-card>

    <div>

    </div>
  </the-content>
  <the-footer />
</template>
