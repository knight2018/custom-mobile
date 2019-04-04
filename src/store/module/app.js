
import { getMenuByRouter } from '@/libs/util'
import routers from '@/router/router'

export default {
    state: {
        
    },
    getters: {
        menuList: (state, getters) => {
            return getMenuByRouter(routers)
          },
    },
    mutations: {
        
    },
    actions: {
        
    }
}