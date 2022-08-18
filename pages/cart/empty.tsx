import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'

const EmptyPage = () => {
  return (
    <ShopLayout
      title="Carrito vacio"
      pageDescription="No hay artículos en el carrito de compras"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row'
          }
        }}
      >'
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" alignItems="center" flexDirection="column">
            <Typography>Su carrito está vacío</Typography>
            <NextLink passHref href="/">
                <Link typography='h4' color='secondary'>
                    Volver
                </Link>
            </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default EmptyPage
