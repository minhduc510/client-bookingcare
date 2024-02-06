/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import {
  useAppDispatch,
  useAppSelector
} from '@/redux/hooks'
import { apiHasToken } from '@/api'
import { userAdded } from '@/redux/slices/user'
import { stateLoginSlice } from '@/redux/slices/auth'
import { setTotalBooking } from '@/redux/slices/totalBooking'

const CallApiGeneral = () => {
  const dispatch = useAppDispatch()
  const { login, token } = useAppSelector(stateLoginSlice)
  useEffect(() => {
    if (login && token) {
      const callApi = async () => {
        const { error, user } =
          await apiHasToken.userCurrent(token)
        if (!error) {
          dispatch(userAdded(user))
          dispatch(setTotalBooking(user.totalBooking))
        }
      }
      callApi()
    }
  }, [login, token])
  return <></>
}

export default CallApiGeneral
