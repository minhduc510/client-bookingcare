import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    boxShadowDark: string
    boxShadowLight: string
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    boxShadowDark: string
    boxShadowLight: string
  }
}

const theme = extendTheme({
  boxShadowDark:
    'rgba(255, 255, 255, 0.05) 0px 6px 24px 0px, rgba(255, 255, 255, 0.08) 0px 0px 0px 1px',
  boxShadowLight:
    'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          light: '#edfffa',
          main: '#5aa8b2',
          dark: 'rgb(67 126 134)'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#333232'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'p, h1, h2, h3, h4, h5, h6': {
          margin: 0
        },
        a: {
          textDecoration: 'none',
          color: 'inherit'
        },
        '*::-webkit-scrollbar': {
          width: '7px',
          height: '7px'
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          backgroundColor: 'rgb(168 162 158)'
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgb(120 113 108)'
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '5px'
        },
        '.swal2-container': {
          zIndex: '20000 !important'
        }
      }
    }
  }
})

export default theme
