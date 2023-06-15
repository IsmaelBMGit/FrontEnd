import axios from 'axios'
import { interceptorErros, interceptorSuccess } from './Interceptors'
import * as Constants from './Constants'

const axiosInstance = axios.create({
  baseURL: Constants.remote_uri,
  headers: {
    // 'Accept-Language': 'es',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token.replace('"', '');
      }
    } catch (error) {
      console.log(error)
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(interceptorSuccess, interceptorErros)

export default axiosInstance