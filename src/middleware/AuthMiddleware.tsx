import { Navigate, useLocation } from 'react-router-dom'

import path from '@/routes/path'
import { useAppSelector } from '@/redux/hooks'
import { stateLoginSlice } from '@/redux/slices/auth'
import { Outlet } from 'react-router-dom'

const AuthMiddleware = () => {
  const location = useLocation()
  let pathname = ''
  if (location.pathname.split('/')[1] === path.admin.path) {
    pathname = `${path.login}`
  }

  const { login, token } = useAppSelector(stateLoginSlice)
  const redirectTo = `${pathname}?continue_url=${encodeURIComponent(
    location.pathname
  )}`

  return (
    <>
      {login && token ? (
        <Outlet />
      ) : (
        <Navigate to={redirectTo} />
      )}
    </>
  )
}

export default AuthMiddleware
