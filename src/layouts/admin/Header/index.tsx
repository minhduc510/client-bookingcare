import { styled } from '@mui/material/styles'
import MuiAppBar, {
  AppBarProps as MuiAppBarProps
} from '@mui/material/AppBar'
import {
  Box,
  Fab,
  Badge,
  Avatar,
  Tooltip,
  Toolbar,
  Typography,
  IconButton,
  useColorScheme
} from '@mui/material'

import { Mode, UserProps } from '@/interface'
import { stateUserSlice } from '@/redux/slices/user'
import { useAppSelector } from '@/redux/hooks'
import {
  FaBell,
  IoSunny,
  BsFillMoonStarsFill,
  FaArrowAltCircleRight
} from '@/icons'
import { useEffect, useState } from 'react'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

interface HeaderProps extends AppBarProps {
  setOpen: (open: boolean) => void
}

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(
    ['margin', 'width'],
    {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }
  ),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(
      ['margin', 'width'],
      {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }
    )
  })
}))

const Header = ({ open, setOpen }: HeaderProps) => {
  const [user, setUser] = useState<UserProps | null>(null)

  const userData = useAppSelector(stateUserSlice)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const { mode, setMode } = useColorScheme()

  const handleTheme = () => {
    const modeChange: Mode =
      mode === 'dark' ? 'light' : ('dark' as Mode)
    setMode(modeChange)
  }

  useEffect(() => {
    if (Object.keys(userData).length) {
      setUser(userData)
    }
  }, [JSON.stringify(userData)])

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: 'white',
              mr: 2,
              ...(open && { display: 'none' })
            }}
          >
            <FaArrowAltCircleRight />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: 'white'
            }}
          >
            Quản trị hệ thống
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Tooltip title="Thông báo">
            <Fab
              size="small"
              aria-label="add"
              sx={{
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'transparent'
                }
              }}
            >
              <Badge
                badgeContent={4}
                color="error"
                sx={{ color: 'white' }}
              >
                <FaBell size={20} />
              </Badge>
            </Fab>
          </Tooltip>

          <Tooltip title="Theme">
            <Fab
              size="small"
              aria-label="add"
              onClick={handleTheme}
              sx={{
                color: 'white',
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'transparent'
                }
              }}
            >
              {mode === 'dark' ? (
                <BsFillMoonStarsFill size={19} />
              ) : (
                <IoSunny size={23} />
              )}
            </Fab>
          </Tooltip>
          <Tooltip title={user?.fullname}>
            <Fab
              size="small"
              aria-label="add"
              sx={{
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'transparent'
                }
              }}
            >
              <Avatar
                alt={user?.fullname}
                src={user?.avatar}
              />
            </Fab>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
