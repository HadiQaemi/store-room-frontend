import axios from 'axios'
import { SERVER_ADDRESS } from 'src/constants/configs'
import { Toast, toastAnyWhere } from 'src/constants/functions'
import { authenticationServices } from './authenticationServices'

export default async function baseService(url, method, data) {
  let token = localStorage.getItem('token') ?? undefined
  const headers = { 'content-type': 'application/json', Authorization: 'Bearer ' + token }
  const API = SERVER_ADDRESS
  try {
    const response = await axios({
      url: `${API}${url}`,
      method: method,
      headers: headers,
      data: data,
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    }
  } catch (error) {
    if (!(error.response.status >= 200 && error.response.status < 300)) {
      Toast.show(error.response.data.message, 'error')
      if (error.response.status === 401) {
        await authenticationServices.logout()
      }
      return { status: 'error', code: error.response.status }
    }
    if (!axios.isCancel(error)) {
      error.response.data.message && toastAnyWhere.show(error.response.data.message, 'error')
      if (error.response.status === 401) {
        await authenticationServices.logout()
      }
    }
  }
}
