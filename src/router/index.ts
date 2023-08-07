import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {
  const login_exptime = localStorage.getItem('login_exptime')
  if (new Date().getTime() / 1000 > Number(login_exptime)) {
    if (to.path !== '/login') {
      next({
        path: '/login',
        replace: true,
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
