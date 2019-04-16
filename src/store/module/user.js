import {login} from '@/api/user'
import { setToken, getToken, setGameId } from '@/libs/util'
export default {
    state: {
        token: getToken(),
        usreName: '',
        userId: '',
        hasGetInfo: false
    },
    getters: {
        
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            setToken(token)
          },
          setUserName (state, name) {
            state.userName = name
          },
          setUserId (state, name){
              state.userId = name;
          },
          setHasGetInfo (state,name) {
              state.hasGetInfo = name;
          }
    },
    actions: {
        handleLogin ({ commit }, { userName, password }) {
            userName = userName.trim()
            let userPwd = password
            return new Promise((resolve, reject) => {
              login({
                userName,
                userPwd
              }).then(res => {
                if (res.data.resultCode === '200') {
                  const data = res.data.Data
                  commit('setToken', data.token)
                  commit('setUserName', data.userName)
                  commit('setUserId', data.id)
                  commit('setHasGetInfo', true)
                  localStorage.setItem('menuPermission', data.menuPermission)
                } else {
                  alert(res.data.message)
                  reject(res.data.message)
                }
                // const data = res.data
                // commit('setToken', data.token)
                resolve()
              }).catch(err => {
                reject(err)
              })
            })
          },
    }
}