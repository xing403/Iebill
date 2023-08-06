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
  <the-header title="修改密码" />
  <the-content pt-60px>
    <el-card m-10px>
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

        <el-form-item>
          <el-button type="primary" w-full>
            确 认 修 改
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </the-content>
</template>
