import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import Header from './Header'
import SideBar from './SideBar'
import DrawerHeader from '@/helpers/drawerHeader'
import { useAppDispatch } from '@/redux/hooks'
import { userAdded } from '@/redux/slices/user'
import { apiHasToken } from '@/api'
import { stateLoginSlice } from '@/redux/slices/auth'
import { useAppSelector } from '@/redux/hooks'

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
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(true)
  const { login, token } = useAppSelector(stateLoginSlice)

  useEffect(() => {
    if (login && token) {
      const callApi = async () => {
        const { error, user } =
          await apiHasToken.userCurrent(token)
        if (!error) {
          dispatch(userAdded(user))
        }
      }
      callApi()
    }
  }, [login, token])

  return (
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
  )
}
