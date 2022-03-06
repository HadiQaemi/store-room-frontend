import {
  GET_USER_INFO,
  SET_USER_INFO_START,
  SET_USER_INFO_SUCC,
  SET_USER_INFO_FAILED,
} from './actionType'
import { authenticationServices } from 'src/services/authenticationServices'

export function loginThunk(dispatch, data) {
  dispatch(setUserStart())
  authenticationServices
    .login(data)
    .then((response) => {
      dispatch(setUserSucc(response))
      return response
    })
    .catch((error) => {
      dispatch(setUserFailed(error))
    })
}
export const getUser = () => ({
  type: GET_USER_INFO,
})

export const setUserStart = (data) => ({
  type: SET_USER_INFO_START,
  payload: data,
})

export const setUserSucc = (data) => ({
  type: SET_USER_INFO_SUCC,
  payload: data,
})

export const setUserFailed = (data) => ({
  type: SET_USER_INFO_FAILED,
  payload: data,
})
