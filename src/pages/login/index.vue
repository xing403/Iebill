<route lang="yaml">
meta:
  title: 登录
  layout: false
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import user from '~/apis/modules/user'

const router = useRouter()
const login = ref({
  username: '',
  password: '',
  remember: false,
})
const login_rules = {
  username: [
    { required: true, message: '请输入用户名', target: 'blur' },
    { min: 5, message: '用户名长度不少于 5 位', target: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', target: 'blur' },
    { min: 6, max: 20, message: '密码长度在6~20 位之间', target: 'blur' },
  ],
}
const register = ref({
  username: '',
  password: '',
  check_password: '',
  remember: false,
})
const register_rules = {
  username: [
    { required: true, message: '请输入用户名', target: 'blur' },
    { min: 5, message: '用户名长度不少于 5 位', target: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', target: 'blur' },
    { min: 6, max: 20, message: '密码长度在6~20 位之间', target: 'blur' },
  ],
  check_password: [
    { min: 6, max: 20, message: '密码长度在6~20 位之间', target: 'blur' },
    { validator: checkPassword, trigger: 'change' },
  ],
}
function checkPassword(rule: any, value: any, callback: any) {
  if (value !== register.value.password)
    callback(new Error('两次密码输入不一致'))
  else
    callback()
}
const loginForm = ref()
const registerForm = ref()
const formType = ref<'login' | 'register' | 'password'>('login')
function handleLogin() {
  loginForm.value.validate((valid: boolean) => {
    if (valid) {
      user.login(login.value).then((res: any) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('login_exptime', Math.floor(new Date().getTime() / 1000) + res.data.exptime)
        localStorage.setItem('username', login.value.username)
        user.information().then((r: any) => {
          localStorage.setItem('user-information', JSON.stringify(r.data))
          ElMessage.success('登录成功')
          router.replace({
            path: '/',
          })
        })
      }).catch((err: any) => {
        ElMessage.error(err.error)
      })
    }
  })
}
function handleRegister() {
  registerForm.value.validate((valid: boolean) => {
    if (valid) {
      user.register(register.value).then((res: any) => {
        ElMessage.success(res.message)
        formType.value = 'login'
      }).catch((err: any) => {
        ElMessage.error(err.error)
      })
    }
  })
}
</script>

<template>
  <div flex="~ col items-center" h-full w-full>
    <el-card w-md>
      <template #header>
        <div flex="~ row gap-1" justify-center>
          <el-radio-group v-model="formType" size="large">
            <el-radio-button label="login">
              登录
            </el-radio-button>
            <el-radio-button label="register">
              注册
            </el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <el-form v-if="formType === 'login'" ref="loginForm" :rules="login_rules" :model="login">
        <el-form-item prop="username">
          <el-input v-model="login.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="login.password" placeholder="密码" type="password" />
        </el-form-item>
        <el-form-item prop="remember">
          <div flex="~ row" w-full justify-between>
            <el-checkbox v-model="login.remember" label="记住密码" />
            <el-link href="/login/change-password" type="primary">
              忘记密码
            </el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" w-full @click="handleLogin">
            登 陆
          </el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="formType === 'register'" ref="registerForm" :model="register" :rules="register_rules">
        <el-form-item prop="username">
          <el-input v-model="register.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="register.password" placeholder="密码" type="password" />
        </el-form-item>
        <el-form-item prop="check_password">
          <el-input v-model="register.check_password" placeholder="确认密码" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" w-full @click="handleRegister">
            注 册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <!-- <el-card m-10px>
    <div flex="~ row gap-1" justify-center>
      <svg-icon name="weChat" h-10 w-10 />
    </div>
  </el-card> -->
</template>
