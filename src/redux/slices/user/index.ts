import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux'
import { UserProps } from '@/interface'

const initialState: UserProps = {
  fullname: '',
  email: '',
  phone: '',
  avatar: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded(state, action) {
      const { fullname, email, phone, avatar } =
        action.payload
      state.fullname = fullname
      state.email = email
      state.phone = phone
      state.avatar = avatar
    }
  }
})

export const { userAdded } = userSlice.actions
export const stateUserSlice = (state: RootState) =>
  state.user
export default userSlice.reducer
