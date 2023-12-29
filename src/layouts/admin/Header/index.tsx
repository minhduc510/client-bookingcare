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
                alt="Remy Sharp"
                src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/237134810_124975096521523_167746239805698786_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=108&ccb=1-7&_nc_sid=bd92f5&_nc_ohc=9thuxeQNcHQAX_Y8RL4&_nc_ht=scontent.fhan15-1.fna&oh=00_AfA3GQIcYiD7qWnjnU3vx8f-bUSC-ftCUTB2QAATijA3CA&oe=65926E29"
              />
            </Fab>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
