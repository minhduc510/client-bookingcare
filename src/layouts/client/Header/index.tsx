import { Link } from 'react-router-dom'
import { useState, MouseEvent } from 'react'
import {
  Box,
  Menu,
  Stack,
  Badge,
  Avatar,
  Tooltip,
  MenuItem,
  Container,
  Typography
} from '@mui/material'

import path from '@/routes/path'
import { FaUserLarge } from '@/icons'
import colorCode from '@/configs/color'
import InputSearch from './InputSearch'
import { useAppSelector } from '@/redux/hooks'
import { stateUserSlice } from '@/redux/slices/user'
import ClockLogo from '@/assets/svg/clock.svg?react'
import { stateLoginSlice } from '@/redux/slices/auth'
import BookingCareLogo from '@/assets/svg/logo.svg?react'
import { stateTotalBookingSlice } from '@/redux/slices/totalBooking'

const Header = () => {
  const { login } = useAppSelector(stateLoginSlice)
  const { fullName, avatar } =
    useAppSelector(stateUserSlice)
  const totalBooking = useAppSelector(
    stateTotalBookingSlice
  )

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? 'primary.main'
                : 'primary.light'
            }`,
          height: (theme) => theme.HEIGHT_HEADER_CLIENT
        }}
      >
        <Container sx={{ height: '100%' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: '100%' }}
          >
            <Link to={`${path.client.home}`}>
              <Box
                sx={{
                  width: {
                    xs: '200px',
                    sm: '240px'
                  },
                  height: {
                    xs: '40px',
                    sm: '50px'
                  }
                }}
              >
                <BookingCareLogo />
              </Box>
            </Link>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={8}
            >
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex'
                  }
                }}
              >
                <InputSearch />
              </Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={{ xs: 3, md: 1 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    marginTop: 1
                  }}
                >
                  <Link to={`/${path.client.booking}`}>
                    <Badge
                      color="error"
                      badgeContent={
                        login && totalBooking > 0
                          ? totalBooking
                          : null
                      }
                    >
                      <Box
                        sx={{
                          width: '25px',
                          height: '25px',
                          path: {
                            fill: (theme) =>
                              `${
                                theme.palette.mode ===
                                'dark'
                                  ? `${colorCode.cyan300}`
                                  : 'primary.main'
                              }`
                          }
                        }}
                      >
                        <ClockLogo />
                      </Box>
                    </Badge>
                    <Typography
                      sx={{
                        display: {
                          xs: 'none',
                          sm: 'block'
                        },
                        fontWeight: 600,
                        color: (theme) =>
                          `${
                            theme.palette.mode === 'dark'
                              ? `${colorCode.cyan300}`
                              : 'primary.main'
                          }`
                      }}
                    >
                      Lịch hẹn
                    </Typography>
                  </Link>
                </Box>
                <Box
                  sx={{
                    textAlign: 'center',
                    marginTop: 1
                  }}
                >
                  {login ? (
                    <>
                      <Box
                        id="basic-button"
                        aria-controls={
                          open ? 'basic-menu' : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={
                          open ? 'true' : undefined
                        }
                        onClick={handleClick}
                        sx={{
                          cursor: 'pointer',
                          border: `1px solid ${colorCode.grey300}`,
                          borderRadius: '50%'
                        }}
                      >
                        <Tooltip title={fullName}>
                          <Avatar
                            alt={fullName}
                            src={avatar}
                            sx={{ width: 45, height: 45 }}
                          />
                        </Tooltip>
                      </Box>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button'
                        }}
                      >
                        <MenuItem
                          sx={{ fontSize: '0.95rem' }}
                          onClick={handleClose}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: '0.95rem' }}
                          onClick={handleClose}
                        >
                          My account
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: '0.95rem' }}
                          onClick={handleClose}
                        >
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Link to={path.client.login}>
                      <Box
                        sx={{
                          width: '25px',
                          height: '26.5px',
                          marginX: 'auto',
                          color: (theme: {
                            palette: { mode: string }
                          }) =>
                            `${
                              theme.palette.mode === 'dark'
                                ? `${colorCode.cyan300}`
                                : 'primary.main'
                            }`
                        }}
                      >
                        <FaUserLarge size={26} />
                      </Box>
                      <Typography
                        sx={{
                          display: {
                            xs: 'none',
                            sm: 'block'
                          },
                          fontWeight: 600,
                          color: (theme: {
                            palette: { mode: string }
                          }) =>
                            `${
                              theme.palette.mode === 'dark'
                                ? `${colorCode.cyan300}`
                                : 'primary.main'
                            }`
                        }}
                      >
                        Đăng nhập
                      </Typography>
                    </Link>
                  )}
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: {
                xs: 'block',
                md: 'none'
              }
            }}
          >
            <InputSearch />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: (theme) =>
            `${
              theme.palette.mode === 'dark'
                ? 'primary.main'
                : 'primary.light'
            }`
        }}
      >
        <Container>
          <Box
            sx={{
              display: {
                xs: 'block',
                md: 'none'
              },
              paddingBottom: 2
            }}
          >
            <InputSearch />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Header
