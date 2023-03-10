import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'

import { AdminNavbar } from '../admin'
import { SideMenu } from '../ui'
import { Box, Typography } from '@mui/material'

interface Props extends PropsWithChildren {
  title: string
  subTitle: string
  icon?: JSX.Element
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
  return (
    <>
      <Head>
        <title>Admin Panel - {title}</title>
        <meta name="og:title" content={title} />
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px'
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon} {title}
          </Typography>
          <Typography sx={{ mb: 1 }} variant="h2" component="h2">
            {subTitle}
          </Typography>
        </Box>

        <Box className="fadeIn">{children}</Box>
      </main>

      {/* Footer */}
      <footer>{/* TODO: mi custom footer */}</footer>
    </>
  )
}
