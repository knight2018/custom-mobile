import Cookies from 'js-cookie'
import config from '@/config'
import { forEach } from '@/libs/tool'

const { cookieExpires } = config
export const TOKEN_KEY = 'token4'

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
  }
  export const setGameName = (gameName) => {
    Cookies.set('gameName', gameName, {expires: cookieExpires || 1})
  }
  export const GetGameName = () => {
    return Cookies.get('gameName')
  }
  export const setGameId = (gameId) => {
    Cookies.set('gameId', gameId, {expires: cookieExpires || 1})
  }
  export const GetGameId = () => {
    return Cookies.get('gameId')
  }
  export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    console.log(Cookies.get(TOKEN_KEY))
    if (token) return token
    else return false
  }

  export const hasChild = (item) => {
    return item.children && item.children.length !== 0
  }

  export const getMenuByRouter = (list) => {
    let arrList = []
    console.log(localStorage.menuPermission)
    if (localStorage.menuPermission !== "01") {
      let menuPermission = JSON.parse(localStorage.menuPermission)
      let game = GetGameId()
      if (menuPermission[game].menuPermission.length) {
        menuPermission[game].menuPermission.forEach(item => {
          arrList.push(item.permissionName)
          if (item.sonPermission.length) {
            item.sonPermission.forEach(items => {
              arrList.push(items)
            })
          }
        })
      }
    }
    forEach(list, item => {
      item.meta.key = 1
    })
    let res = []
    forEach(list, item => {
      item.meta.navOff = false;
      if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
        
        if (localStorage.menuPermission !== "01") {
          arrList.forEach(items => {
            if (items === item.name) {
              item.meta.key = 0
            }
          })
        } else {
          item.meta.key = 0
        }
        
        if (!item.meta.key) {

          let obj = {
            icon: (item.meta && item.meta.icon) || '',
            name: item.name,
            meta: item.meta
          }
          if ((hasChild(item) || (item.meta && item.meta.showAlways))) {
            obj.children = getMenuByRouter(item.children)
          }
          if (item.meta && item.meta.href) obj.href = item.meta.href
           res.push(obj)
        }
      }
    })
    return res
  }