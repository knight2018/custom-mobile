
import { getMenuByRouter } from '@/libs/util'
import routers from '@/router/router'

export default {
    state: {
        title: ''
    },
    getters: {
        menuList: (state, getters) => {
            return getMenuByRouter(routers)
          },
        getTitle: (state, getters) => {
            return state.title;
        }
    },
    mutations: {
        setTitle(state, title){
            state.title = title
        }
    },
    actions: {
        
    }
}