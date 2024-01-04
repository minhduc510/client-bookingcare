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

import { Mode } from '@/interface'
import {
  FaBell,
  IoSunny,
  BsFillMoonStarsFill,
  FaArrowAltCircleRight
} from '@/icons'

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
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const { mode, setMode } = useColorScheme()

  const handleTheme = () => {
    const modeChange: Mode =
      mode === 'dark' ? 'light' : ('dark' as Mode)
    setMode(modeChange)
  }
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
          <Tooltip title="Minh Đức">
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
                alt="Minh Đức"
                src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltcf76ab38307aef41/647052e443b091a2e2d91d10/GettyImages-1478795049_(1).jpg?auto=webp&format=pjpg&width=3840&quality=60"
              />
            </Fab>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
