import api from '..'

export default {
  getPayList: (data: any) => api.post('/bill/list', data),
  savePay: (data: any) => api.post('/bill/save', data),
  monthly: (data: any) => api.post('/bill/monthly', data),
  information: (data: any) => api.post('/bill/information', data),

}
