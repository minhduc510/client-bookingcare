import { combineReducers } from 'redux'

import authSlice from './auth'
import userSlice from './user'
import totalBookingSlice from './totalBooking'

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  totalBooking: totalBookingSlice
})

export default rootReducer
