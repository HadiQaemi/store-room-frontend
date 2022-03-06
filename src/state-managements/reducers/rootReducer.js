import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { changeState } from './changeState'
import { userReducerThunk } from './userReducerThunk'

export default combineReducers({
  userState: userReducer,
  changeState: changeState,
  data: userReducerThunk,
})
