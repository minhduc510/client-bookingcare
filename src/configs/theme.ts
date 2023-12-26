import { createTheme } from '@mui/material'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'p, h1, h2, h3, h4, h5, h6': {
          margin: 0
        }
      }
    }
  }
})

export default theme
