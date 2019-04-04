import axios from '@/libs/axios'

export const login = ({ userName, userPwd }) => {
    const params = {
      userName,
      userPwd
    }
    return axios.request({
      url: '/login',
      params,
      method: 'get'
    })
  }