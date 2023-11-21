<route lang="yaml">
meta:
  title: 个人设置
</route>

<script setup lang="ts">
const router = useRouter()
const mode = ref(theme.value === 'dark')
const login_exptime = localStorage.getItem('login_exptime') ?? 0
const user_information = ref(JSON.parse(localStorage.getItem('user-information') ?? '{}'))
function handleTheme(value: any) {
  theme.value = value ? 'dark' : 'light'
}
function handleLogout() {
  localStorage.removeItem('user-information')
  localStorage.removeItem('login_exptime')
  localStorage.removeItem('username')
  localStorage.removeItem('token')
  router.replace({
    path: '/login',
  })
}
function goto(path: string) {
  router.push({
    path,
  })
}
</script>

<template>
  <div flex="~ col gap-2">
    <el-card shadow="always">
      <div v-if="new Date().getTime() / 1000 <= Number(login_exptime)" flex="~ row" justify-center>
        <template v-if="user_information.avatar">
          <el-avatar :size="100" :src="user_information.avatar" />
        </template>
        <template v-else>
          <el-avatar :size="100">
            <template #default>
              <svg-icon name="carbon:user-avatar" h-full w-full />
            </template>
          </el-avatar>
        </template>
      </div>
    </el-card>
    <el-card shadow="always">
      <div flex="~ row items-center" justify-between @click="goto('/user/information')">
        <div>个人信息</div>
        <svg-icon name="carbon:chevron-right" />
      </div>
      <el-divider my-2 />
      <div flex="~ row items-center" justify-between>
        <div>暗夜模式</div>
        <el-switch v-model="mode" @change="handleTheme" />
      </div>
    </el-card>
    <el-card shadow="always">
      <div flex="~ row items-center" justify-between>
        <el-button type="warning" w-full @click="handleLogout">
          退出登录
        </el-button>
      </div>
    </el-card>
  </div>
</template>
