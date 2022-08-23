import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { lightTheme } from '../themes'
import { CartProvider, UIProvider, AuthProvider } from '../context'
import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then(res => res.json())
      }}
    >
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SnackbarProvider>
    </SWRConfig>
  )
}

export default MyApp
