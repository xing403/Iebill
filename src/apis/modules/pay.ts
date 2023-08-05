import api from '..'

export default {
  getPayList: (data: any) => api.post('/list', data),
  savePay: (data: any) => api.post('/save', data),

}
