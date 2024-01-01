import { Theme } from '@mui/material'

const styleModel = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 360,
    sm: 500
  },
  bgcolor: 'background.paper',
  boxShadow: (theme: Theme) =>
    `${
      theme.palette.mode === 'dark'
        ? theme.boxShadowDark
        : theme.boxShadowLight
    }`,
  p: 4,
  borderRadius: 2
}

export default styleModel
