import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      desktop: 1024,
    },
  },
})
