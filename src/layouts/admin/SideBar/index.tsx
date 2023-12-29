/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  List,
  Drawer,
  Divider,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material'

import MENU_ADMIN from '@/utils/constant'
import DrawerHeader from '@/helpers/drawerHeader'
import ReactLogo from '@/assets/svg/logo.svg?react'
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight
} from '@/icons'

interface SideBarProps {
  open: boolean
  setOpen: (open: boolean) => void
  drawerWidth: number
}

const SideBar = ({
  open,
  setOpen,
  drawerWidth
}: SideBarProps) => {
  const theme = useTheme()

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box sx={{ marginTop: 1 }}>
          <ReactLogo />
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ color: 'primary.main' }}
        >
          {theme.direction === 'ltr' ? (
            <FaArrowAltCircleLeft />
          ) : (
            <FaArrowAltCircleRight />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {MENU_ADMIN.controls.map(
          ({ link, icon: Icon, name, sizeIcon }) => (
            <Link to={link} key={link}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon size={sizeIcon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{ marginTop: 1 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )}
      </List>
      <Divider />
      {MENU_ADMIN.personal.map(
        ({ link, icon: Icon, name, sizeIcon }) => (
          <ListItem key={link} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon size={sizeIcon} />
              </ListItemIcon>
              <ListItemText
                primary={name}
                sx={{ marginTop: 1 }}
              />
            </ListItemButton>
          </ListItem>
        )
      )}
    </Drawer>
  )
}

export default SideBar
