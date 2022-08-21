import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { lightTheme } from '../themes'
import { UIProvider } from '../context/ui'
import { CartProvider } from '../context'
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
        <CartProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </CartProvider>
      </SnackbarProvider>
    </SWRConfig>
  )
}

export default MyApp
