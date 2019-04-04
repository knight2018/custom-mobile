import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store'
import { setToken, getToken, setGameId, GetGameId } from '@/libs/util'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'hash'
})

const LOGIN_PAGE_NAME = 'login'
router.beforeEach((to, from, next) => {
    const token = getToken()
    const id = GetGameId()
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        name: 'home' // 跳转到homeName页
      })
    } else if (token && to.name === 'select') {
      next()
    } else {
      if (store.state.user.hasGetInfo) {
        if (id) {
            next()
        } else {
          next({
            name: 'select'
          })
        }
      } else {

        if(token){
          store.commit('setHasGetInfo', true)
          next({
            name: to.name
          })
        }else{
          setGameId('')
          localStorage.setItem("menuPermission","")
          next({
            name: 'login'
          })
        }
      }
    }
  })
  
  router.afterEach(to => {
    window.scrollTo(0, 0)
  })
  
  export default router