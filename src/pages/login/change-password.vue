<route lang="yaml">
meta:
  title: 修改密码
  layout: false
</route>

<script setup lang="ts">
const changepwd = ref({
  username: '',
  password: '',
  check_password: '',
  remember: false,
})
const passwordForm = ref()
</script>

<template>
  <div flex="~ col items-center" h-full w-full>
    <el-card w-md>
      <el-form ref="passwordForm" :model="changepwd">
        <el-form-item prop="username">
          <el-input v-model="changepwd.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="changepwd.password" placeholder="密码" type="password" />
        </el-form-item>
        <el-form-item prop="check_password">
          <el-input v-model="changepwd.check_password" placeholder="确认密码" type="password" />
        </el-form-item>
        <el-form-item prop="check_password">
          <div flex="~ row" w-full justify-between>
            <div />
            <el-link href="/login" type="primary">
              去登陆
            </el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" w-full>
            确认修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
