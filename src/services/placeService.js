import baseRequest, { setToken } from './baseRequest'

export const placeServices = {
  getStoreRooms: async (data) => baseRequest(data, '/store-room', 'get', true),
  insertStoreRoom: async (data) => baseRequest(data, '/store-room', 'post', true),
  getWithProvinceId: async (id) => baseRequest(null, `/city/?provinceId=${id}`, 'get', true),
}
