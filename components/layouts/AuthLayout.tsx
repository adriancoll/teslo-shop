import { FC } from 'react'

import Head from 'next/head'

import { Box } from '@mui/material'

interface Props {
  title: string
  pageDescription: string
  imageFullUrl?: string
}

export const AuthLayout: FC<Props> = ({
  title,
  pageDescription,
  imageFullUrl,
  children
}) => {
  return (
    <>
      <Head>
        <title>Teslo - {title}</title>
        <meta name="description" content={pageDescription} />

        {/*  Open Graph metatags */}
        <meta property="og:title" content={title} />
        <meta property="og:descrition" content={pageDescription} />

        {imageFullUrl && <meta property="og:image" content={imageFullUrl} />}

        {/* <meta property="og:url" content={'/'} /> */}
      </Head>

      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 40px' }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>

      <footer>{/* footer */}</footer>
    </>
  )
}
