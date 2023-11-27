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
        remember_me()
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

function remember_me() {
  if (login.value.remember)
    localStorage.setItem('remember_me', 'true')

  else
    localStorage.removeItem('remember_me')
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

onMounted(() => {
  if (localStorage.getItem('remember_me') === 'true')
    login.value.remember = true
})
</script>

<template>
  <div flex="~ row items-center" h-full w-full justify-end>
    <div flex="~ row items-center justify-center" h-full w-full md-w-md dark:bg-hex-1d1e1f>
      <div v-if="formType === 'login'" w-sm>
        <div mb-8 text-center text-2xl v-text="'登 录'" />
        <el-form ref="loginForm" :rules="login_rules" :model="login">
          <el-form-item prop="username">
            <el-input v-model="login.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="login.password" placeholder="密码" type="password" />
          </el-form-item>
          <el-form-item prop="remember">
            <div flex="~ row" w-full justify-between>
              <el-checkbox v-model="login.remember" label="记住密码" />
              <el-link href="/login/change-password" type="primary" v-text="'忘记密码'" />
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" w-full @click="handleLogin" v-text="'登录'" />
          </el-form-item>

          <el-form-item>
            <div flex="~ row" w-full justify-center>
              还没有账号? <el-link href="" type="primary" @click="formType = 'register'" v-text="'去注册'" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="formType === 'register'" w-sm>
        <div mb-8 text-center text-2xl v-text="'注册'" />
        <el-form ref="registerForm" :model="register" :rules="register_rules">
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
            <el-button type="primary" w-full @click="handleRegister" v-text="'注 册'" />
          </el-form-item>
          <el-form-item>
            <div flex="~ row" w-full justify-center>
              已有帐号 <el-link href="" type="primary" @click="formType = 'login'" v-text="'去登录'" />
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
