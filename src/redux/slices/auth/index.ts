import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux'

interface IProps {
  login: boolean
  token: string | null
}

const initialState: IProps = {
  login: false,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAdded(state, action) {
      return {
        ...state,
        login: true,
        token: action.payload
      }
    },
    logoutAdded() {
      return {
        ...initialState
      }
    }
  }
})

export const { loginAdded, logoutAdded } = authSlice.actions
export const stateLoginSlice = (state: RootState) =>
  state.auth
export default authSlice.reducer
