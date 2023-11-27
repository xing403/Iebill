<route lang="yaml">
meta:
  title: 个人设置
</route>

<script setup lang="ts">
const router = useRouter()
const mode = ref(theme.value === 'dark')
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
  <div flex="~ col gap-2">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :xl="8" :lg="8">
        <el-card>
          <template #header>
            <div flex="~ row" justify-center>
              <el-avatar :size="100" :src="user_information.avatar">
                <el-avatar :size="100">
                  <template #default>
                    <svg-icon name="carbon:user-avatar" h-full w-full />
                  </template>
                </el-avatar>
              </el-avatar>
            </div>
          </template>
          <div>
            <el-descriptions title="个人信息" :column="1" border>
              <el-descriptions-item label="用户名">
                {{ user_information.username }}
              </el-descriptions-item>
              <el-descriptions-item label="身份">
                {{ user_information.authority }}
              </el-descriptions-item>
              <el-descriptions-item label="注册时间">
                {{ user_information.create_time }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <el-divider border-style="dotted" />
          <div flex="~ row items-center" justify-center>
            <el-button type="warning" w-xs @click="handleLogout" v-text="'退出登录'" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :xl="16" :lg="16">
        <el-card shadow="always">
          <div flex="~ row items-center" justify-between>
            <div>暗夜模式</div>
            <el-switch v-model="mode" @change="handleTheme" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
