import axios from 'axios'
import config from '@/config'
import router from '@/router/index'
import { getToken, setToken, setGameId } from '@/libs/util'

const baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;
const instance = axios.create();
instance.defaults.baseURL = baseURL;
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = getToken();
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


  axios.interceptors.response.use(function (res) {
    //对响应数据做点什么
    if (res.data.resultCode == "402") {
      alert(res.data.message)
      setToken('')
      setGameId('')
      localStorage.setItem("menuPermission","")
      router.replace({
        path: '/login'
      })
    }
    return res;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  export default axios