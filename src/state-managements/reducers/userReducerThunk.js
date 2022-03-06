import {
  GET_USER_INFO,
  SET_USER_INFO_START,
  SET_USER_INFO_SUCC,
  SET_USER_INFO_FAILED,
} from '../actions/actionType'
const initialData = {
  user: [],
  isLoading: true,
  message: '',
}

export const userReducerThunk = function (user = initialData, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return user
    case SET_USER_INFO_START:
      return { user: [], message: '', isLoading: true }
    case SET_USER_INFO_SUCC:
      return { user: action.payload.userinfo, message: '', isLoading: false }
    case SET_USER_INFO_FAILED:
      return { user: [], message: action.payload, isLoading: false }
    default:
      return user
  }
}
