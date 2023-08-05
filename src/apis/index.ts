import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.DEV
    && import.meta.env.VITE_OPEN_PROXY === 'true')
    ? '/api'
    : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

api.interceptors.request.use(
  (request) => {
    return request
  },
)

api.interceptors.response.use(
  (response) => {
    if (response.data.status === 1) {
      if (response.data.error !== '')
        return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    let message = error.message
    if (message === 'Network Error')
      message = '后端网络故障'

    else if (message.includes('timeout'))
      message = '接口请求超时'

    else if (message.includes('Request failed with status code'))
      message = `接口${message.substr(message.length - 3)}异常`
    return Promise.reject(error)
  },
)

export default api
