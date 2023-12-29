import {
  Box,
  SvgIcon,
  SpeedDial,
  SpeedDialIcon,
  useColorScheme,
  SpeedDialAction
} from '@mui/material'

import { Mode } from '@/interface'
import { IoSunny, BsFillMoonStarsFill } from '@/icons'
import ReactSupport from '@/assets/svg/support.svg?react'

export default function Options() {
  const { mode, setMode } = useColorScheme()

  const actions = [
    {
      icon:
        mode === 'dark' ? (
          <BsFillMoonStarsFill size={19} />
        ) : (
          <IoSunny size={23} />
        ),
      name: 'Theme'
    },
    {
      icon: (
        <SvgIcon
          component={ReactSupport}
          sx={{
            path: {
              fill: (theme) =>
                `${
                  theme.palette.mode === 'dark'
                    ? '#b0a5a5'
                    : '#626161'
                }`
            },
            width: '21px'
          }}
        />
      ),
      name: 'Hỗ trợ'
    }
  ]

  const handleTheme = () => {
    const modeChange: Mode =
      mode === 'dark' ? 'light' : ('dark' as Mode)
    setMode(modeChange)
  }
  return (
    <Box
      sx={{
        height: 320,
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'fixed',
        right: 1,
        bottom: 1
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={
          <SpeedDialIcon
            openIcon={''}
            sx={{ color: 'white' }}
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={
              action.name === 'Theme'
                ? handleTheme
                : () => {}
            }
            sx={{
              boxShadow: (theme) =>
                `${
                  theme.palette.mode === 'dark'
                    ? theme.boxShadowDark
                    : theme.boxShadowLight
                }`
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}
