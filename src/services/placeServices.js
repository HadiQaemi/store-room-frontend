import baseService from './baseService'

export const placeServices = {
  //storeRooms services
  getStoreRooms: async () => baseService('/store-room', 'GET'),
  removeStoreRoom: async (id) => baseService(`/store-room/${id}`, 'DELETE'),
  insertStoreRoom: async (data) => baseService('/store-room', 'POST', data),
  updateStoreRoom: async (id, data) => baseService(`/store-room/${id}/update`, 'PATCH', data),
  //bankUnits services
  getBankUnits: async () => baseService('/bank-units', 'GET'),
  removeBankUnit: async (id) => baseService(`/bank-units/${id}`, 'DELETE'),
  insertBankUnit: async (data) => baseService('/bank-units', 'POST', data),
  updateBankUnit: async (id, data) => baseService(`/bank-units/${id}/update`, 'PATCH', data),
  //branches services
  getBranches: async () => baseService('/branches', 'GET'),
  removeBranch: async (id) => baseService(`/branches/${id}`, 'DELETE'),
  insertBranch: async (data) => baseService('/branches', 'POST', data),
  updateBranch: async (id, data) => baseService(`/branches/${id}/update`, 'PATCH', data),
  //others services
  getOthers: async () => baseService('/others', 'GET'),
  removeOther: async (id) => baseService(`/others/${id}`, 'DELETE'),
  insertOther: async (data) => baseService('/others', 'POST', data),
  updateOther: async (id, data) => baseService(`/others/${id}/update`, 'PATCH', data),
  //places services
  getPlaces: async () => baseService('/places', 'GET'),
  //tools services
  getToolGroups: async () => baseService('/tools/groups', 'GET'),
  getToolModels: async () => baseService('/tools/models', 'GET'),
  //recipts services
  addReceipt: async (data) => baseService('/receipts', 'POST', data),
}
