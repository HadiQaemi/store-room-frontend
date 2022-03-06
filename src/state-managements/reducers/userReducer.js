import { GET_USER_INFO, SET_USER_INFO } from '../actions/actionType'
const initialUser = { firstname: 'name', lastname: 'family' }

export const userReducer = function (user = initialUser, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return user
    case SET_USER_INFO:
      return action.payload
    default:
      return user
  }
}
