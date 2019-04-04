

export default [
    {
      path: '/login',
      name: 'login',
      meta:{
        keepAlive: false,
        title: '登陆',
        hideInMenu: true
      },
      component: () => import('@/views/login/login')
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        keepAlive: true,
        title: '首页',
        hideInMenu: true
      },
      component: () => import('@/views/home/home')
    },
    {
      path: '/selectList',
      name: 'selectList',
      meta: {
        keepAlive: false,
        title: '游戏选择',
        hideInMenu: true
      },
      component: () => import('@/views/select/selectList')
    }
  ]
