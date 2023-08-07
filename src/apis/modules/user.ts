import md5 from 'js-md5'
import api from '..'

export default {
  login: (data: any) => {
    const params = {
      username: data.username,
      password: md5(data.password),
    }
    return api.post('/user/login', params)
  },
  register: (data: any) => {
    const params = {
      username: data.username,
      password: md5(data.password),
    }
    return api.post('/user/register', params)
  },
  token: () => api.post('/user/register', {}, {}),
  information: () => api.post('/user/information', {}, {}),
}
