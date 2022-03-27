import PropTypes from 'prop-types'
import React from 'react'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import myTheme from '../theme'
import { cache } from '../cache'
import createEmotionCache from '../createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
})

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(() => myTheme(prefersDarkMode), [prefersDarkMode])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
  emotionCache: PropTypes.object,
}

export default MyApp
