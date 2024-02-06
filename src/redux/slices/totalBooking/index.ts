import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux'

const initialState = 0

const totalBookingSlice = createSlice({
  name: 'totalBooking',
  initialState,
  reducers: {
    setTotalBooking(state, action) {
      return (state = action.payload)
    },
    decreaseTotalBooking(state, action) {
      return (state = state - action.payload)
    }
  }
})

export const { setTotalBooking, decreaseTotalBooking } =
  totalBookingSlice.actions
export const stateTotalBookingSlice = (state: RootState) =>
  state.totalBooking
export default totalBookingSlice.reducer
