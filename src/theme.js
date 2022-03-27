import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

export default (prefersDarkMode) =>
  createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      ...(prefersDarkMode
        ? {
          background: {
            default: 'rgb(0, 30, 60)',
            paper: 'rgb(0, 30, 60)',
          },
          text: {
            primary: 'rgb(255, 255, 255)',
            secondary: grey[500],
          },
        }
        : {
          background: {
            default: grey[100],
            paper: grey[100],
          },
          text: {
            primary: grey[700],
            secondary: grey[500],
          },
        }),
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        desktop: 1024,
      },
    },
  })
