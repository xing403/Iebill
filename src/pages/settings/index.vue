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
</script>

<template>
  <the-header :back="false" title="设置" />
  <the-content pb-15 pl-1 pr-1 pt-60px>
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
    <el-card shadow="always">
      <div flex="~ row items-center" justify-between>
        <el-button type="warning" w-full @click="handleLogout">
          退出登录
        </el-button>
      </div>
    </el-card>

    <div />
  </the-content>
  <the-footer />
</template>
