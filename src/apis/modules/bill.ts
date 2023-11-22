import api from '..'

// 账单 apis
export default {

  /** 账单列表
   * @param data
   * @returns
   */
  getBillList: (data: any) => api.post('/bill/list', data, {}),

  /** 保存一个账单
   * @param data
   * @returns
   */
  saveBill: (data: any) => api.post('/bill/save', data, {}),
  /** 修改账单
   * @param data
   * @returns
   */
  modifyBill: (data: any) => api.post('/bill/modify', data, {}),
  /** 删除一个账单
   * @param data
   * @returns
   */
  deleteBill: (data: any) => api.post('/bill/delete', data, {}),

  /** 账单详情
   * @param data
   * @returns
   */
  information: (data: any) => api.post('/bill/information', data, {}),

  /** 获取每月账单统计
   * @param data
   * @returns
   */
  getBillStatisticsByMonthly: (data: any) => api.post('/bill/monthly', data, {}),
}
