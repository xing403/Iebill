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
  <div flex="~ row items-center" h-full w-full justify-end>
    <div h-full w-full md-w-md flex="~ row items-center justify-center" dark:bg-hex-1D1E1F>
      <div w-sm>
        <div mb-8 text-center text-2xl v-text="'修改密码'" />
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
            <el-button type="primary" w-full v-text="'确认修改'" />
          </el-form-item>
          <el-form-item prop="check_password">
            <div flex="~ row" w-full justify-center>
              <el-link href="/login" type="primary" v-text="'去登陆'" />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.el-main{
  --el-main-padding: 0;
}
</style>
