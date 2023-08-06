import api from '..'

export default {
  login: (data: any) => api.post('/user/login', data),
  register: (data: any) => api.post('/user/register', data),

}
