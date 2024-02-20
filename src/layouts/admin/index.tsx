/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import Header from './Header'
import SideBar from './SideBar'
import path from '@/routes/path'
import { apiNoToken } from '@/api'
import DrawerHeader from '@/helpers/drawerHeader'
import {
  useAppDispatch,
  useAppSelector
} from '@/redux/hooks'
import {
  logoutAdded,
  stateLoginSlice
} from '@/redux/slices/auth'

const drawerWidth = 240

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open'
})<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

export default function Admin() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const { login, token } = useAppSelector(stateLoginSlice)
  const dispatch = useAppDispatch()
  const [authConfirmed, setAuthConfirmed] = useState(false)

  useEffect(() => {
    const callApi = async () => {
      const { error } = await apiNoToken.checkAuthRoleLogin(
        'Admin',
        token as string
      )
      if (error) {
        dispatch(logoutAdded())
        navigate(`/${path.admin.login}`)
      } else {
        setAuthConfirmed(true)
      }
    }

    if (login && token) {
      callApi()
    }
  }, [login, token])

  return (
    <>
      {authConfirmed && (
        <Box sx={{ display: 'flex', overflow: 'hidden' }}>
          <Header open={open} setOpen={setOpen} />
          <SideBar
            open={open}
            setOpen={setOpen}
            drawerWidth={drawerWidth}
          />
          <Main
            open={open}
            sx={{
              p: {
                xs: 0,
                md: 2
              }
            }}
          >
            <DrawerHeader />
            <Box
              sx={{
                boxShadow: (theme) =>
                  `${
                    theme.palette.mode === 'dark'
                      ? theme.boxShadowDark
                      : theme.boxShadowLight
                  }`,
                borderRadius: {
                  xs: 0,
                  md: 2
                },
                p: {
                  xs: 1,
                  md: 2
                },
                marginTop: 1
              }}
            >
              <Outlet />
            </Box>
          </Main>
        </Box>
      )}
    </>
  )
}
