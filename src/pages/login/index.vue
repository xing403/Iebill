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
const loginForm = ref()
const registerForm = ref()
const formType = ref<'login' | 'register' | 'password'>('login')
function handleLogin() {
  loginForm.value.validate((valid: boolean) => {
    if (valid) {
      user.login(login.value).then((res: any) => {
        localStorage.setItem('token', res.data)
        localStorage.setItem('username', login.value.username)
        router.replace({
          path: '/',
        })
      }).catch((err: any) => {
        ElMessage.error(err.error)
      })
    }
  })
}
</script>

<template>
  <the-header :back="false" title="登录" />
  <the-content pt-60px>
    <el-card m-10px>
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
            <el-link href="login/changepwd" type="primary">
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
      <el-form v-if="formType === 'register'" ref="registerForm" :model="register">
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
          <el-button type="primary" w-full>
            注 册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </the-content>
</template>