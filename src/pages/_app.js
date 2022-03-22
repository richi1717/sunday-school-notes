import PropTypes from 'prop-types'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { cache } from '../cache'
import theme from '../theme'
import createEmotionCache from '../createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
})

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => (
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  </CacheProvider>
)

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
  emotionCache: PropTypes.object,
}

export default MyApp
