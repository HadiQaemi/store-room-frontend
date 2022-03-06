import { GET_USER_INFO, SET_USER_INFO } from './actionType'

export const getUser = () => ({
  type: GET_USER_INFO,
})

export const setUser = (data) => ({
  type: SET_USER_INFO,
  payload: data,
})
