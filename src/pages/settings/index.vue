<script setup lang="ts">
const router = useRouter()
const mode = ref(theme.value === 'dark')
function handleTheme(value: any) {
  theme.value = value ? 'dark' : 'light'
}
function handleLogin() {
  router.push({
    path: '/login',
  })
}
</script>

<template>
  <the-header :back="false" title="设置" />
  <the-content pb-15 pl-1 pr-1 pt-60px>
    <el-card shadow="always">
      <div flex="~ row" justify-center>
        <el-avatar :size="100" @click="handleLogin">
          <template #default>
            <svg-icon name="carbon:user-avatar" h-full w-full />
          </template>
        </el-avatar>
      </div>
    </el-card>
    <el-card shadow="always">
      <div flex="~ row items-center" justify-between>
        <div>个人信息</div>
        <svg-icon name="carbon:chevron-right" />
      </div>
      <el-divider my-2 />
      <div flex="~ row items-center" justify-between>
        <div>暗夜模式</div>
        <el-switch v-model="mode" @change="handleTheme" />
      </div>
    </el-card>

    <div />
  </the-content>
  <the-footer />
</template>
