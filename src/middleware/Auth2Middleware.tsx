import { Navigate, useLocation } from 'react-router-dom'

import path from '@/routes/path'
import { useAppSelector } from '@/redux/hooks'
import { stateLoginSlice } from '@/redux/slices/auth'
import { Outlet } from 'react-router-dom'

const Auth2Middleware = () => {
  const location = useLocation()
  const { login, token } = useAppSelector(stateLoginSlice)
  let pathname = ''
  if (
    location.pathname.split('/')[1] === path.client.login
  ) {
    pathname = path.client.home
  } else if (
    location.pathname.split('/')[1] === path.doctor.home
  ) {
    pathname = `/${path.doctor.home}`
  } else if (
    location.pathname.split('/')[1] === path.admin.home
  ) {
    pathname = `/${path.admin.home}`
  }

  return (
    <>
      {!(login && token) ? (
        <Outlet />
      ) : (
        <Navigate to={pathname} />
      )}
    </>
  )
}

export default Auth2Middleware
