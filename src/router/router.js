import navTab from "../components/fixation/navTab.vue"

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
      path: '/',
      name: 'home',
      meta: {
        keepAlive: true,
        title: '首页',
        hideInMenu: true
      },
      component: () => import('@/views/home/home')
    },
    {
      path: '/select',
      name: 'select',
      meta: {
        keepAlive: false,
        title: '游戏选择',
        hideInMenu: true
      },
      component: () => import('@/views/select/select')
    },
    {
      path: '/combination',
      name: '报表组合',
      meta: {
        title: '报表组合',
        key: 1,
      },
      component: navTab,
      children: [
        {
          path: 'combinationList',
          name: '报表组合列表',
          meta: {
            title: '报表组合列表',
            key: 1,
          },
          component: () => import('@/views/combination/combination.vue')
        },
        {
          path: 'configuration',
          name: 'configuration',
          meta: {
            title: '参数组合配置',
            key: 1,
            hideInMenu: true,
          },
          component: () => import('@/views/combination/configuration.vue')
        }
      ]
    },
  ]
