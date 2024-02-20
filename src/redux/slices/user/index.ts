import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux'
import { UserProps } from '@/interface'

const initialState: UserProps = {
  id: '',
  fullName: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  typeLogin: 0,
  gender: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded(state, action) {
      const {
        id,
        fullName,
        firstName,
        lastName,
        gender,
        email,
        phone,
        address,
        avatar,
        typeLogin
      } = action.payload
      state.id = id
      state.fullName = fullName
      state.firstName = firstName
      state.lastName = lastName
      state.gender = gender
      state.email = email
      state.phone = phone
      state.avatar = avatar
      state.address = address
      state.typeLogin = typeLogin
    },
    userUpdated(state, action) {
      return (state = { ...state, ...action.payload })
    }
  }
})

export const { userAdded, userUpdated } = userSlice.actions
export const stateUserSlice = (state: RootState) =>
  state.user
export default userSlice.reducer
