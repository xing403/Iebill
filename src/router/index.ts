import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

// 路由白名单
const write_list = ['/login', '/register', '/404', '/403', '/500', '/login/change-password']
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {
  useTitle(to.meta.title as string || 'lebill')
  const login_exptime = localStorage.getItem('login_exptime')
  if (new Date().getTime() / 1000 > Number(login_exptime)) {
    if (write_list.includes(to.path)) {
      next()
    }
    else {
      next({
        path: '/login',
        replace: true,
      })
    }
  }
  else {
    if (to.path === '/login') {
      next({
        path: from.path,
        replace: true,
      })
    }
    else {
      next()
    }
  }
})

export default router
