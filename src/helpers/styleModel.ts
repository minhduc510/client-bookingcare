import { Theme } from '@mui/material'

const styleModel = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflowY: 'auto',
  width: {
    xs: '100%',
    sm: 600
  },
  height: {
    xs: '100%',
    sm: 'auto'
  },
  maxHeight: {
    xs: '100%',
    sm: '900px'
  },
  bgcolor: 'background.paper',
  boxShadow: (theme: Theme) =>
    `${
      theme.palette.mode === 'dark'
        ? theme.boxShadowDark
        : theme.boxShadowLight
    }`,
  p: {
    xs: 1,
    sm: 4
  },
  borderRadius: {
    xs: 0,
    sm: 2
  }
}

export default styleModel
