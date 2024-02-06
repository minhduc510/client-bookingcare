import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux'
import { UserProps } from '@/interface'

const initialState: UserProps = {
  id: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  avatar: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded(state, action) {
      const {
        id,
        fullName,
        email,
        phone,
        address,
        avatar
      } = action.payload
      state.id = id
      state.fullName = fullName
      state.email = email
      state.phone = phone
      state.avatar = avatar
      state.address = address
    }
  }
})

export const { userAdded } = userSlice.actions
export const stateUserSlice = (state: RootState) =>
  state.user
export default userSlice.reducer
