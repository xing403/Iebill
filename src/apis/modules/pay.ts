import api from '..'

export default {
  getPayList: (data: any) => api.post('/list', data),
  savePay: (data: any) => api.post('/save', data),
  monthly: (data: any) => api.post('/monthly', data),
  information: (data: any) => api.post('/information', data),

}
