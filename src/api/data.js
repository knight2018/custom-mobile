import axios from '@/libs/axios'

export const Select = () => {
    return axios.request({
      url: '/game/select',
      method: 'get'
    })
}

export const SelectAdd = ({ gameId, gameName, principalPhone }) => {
    return axios.request({
      url: '/game/add',
      params: {
        gameId, gameName, principalPhone
      },
      method: 'post'
    })
}