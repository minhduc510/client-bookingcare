import { combineReducers } from 'redux'

import authSlice from './auth'
import userSlice from './user'

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice
})

export default rootReducer
