import { FC, PropsWithChildren } from 'react'

import Head from 'next/head'

import { Navbar, SideMenu } from '../ui'

interface Props extends PropsWithChildren {
  title: string
  pageDescription: string
  imageFullUrl?: string
}

export const ShopLayout: FC<Props> = ({
  title,
  pageDescription,
  imageFullUrl,
  children
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        {/*  Open Graph metatags */}
        <meta property="og:title" content={title} />
        <meta property="og:descrition" content={pageDescription} />

        {imageFullUrl && <meta property="og:image" content={imageFullUrl} />}

        {/* <meta property="og:url" content={'/'} /> */}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 40px' }}
      >
        {children}
      </main>

      <footer>{/* footer */}</footer>
    </>
  )
}
