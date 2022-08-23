import React, { useContext, useEffect } from 'react'

import { useRouter } from 'next/router'

import { CartContext, cartReducer } from '../../context'

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CartItem } from '../../components/cart/CartItem'

const CartPage = () => {
  const { numberOfItems, isLoaded } = useContext(CartContext)
  const { push, replace } = useRouter()

  const titleFormat =
    numberOfItems === 0
      ? 'Vacío'
      : numberOfItems === 1
      ? '1 producto'
      : `${numberOfItems} productos`

  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      replace('/cart/empty')
    }
  }, [isLoaded, replace, numberOfItems])

  if (!isLoaded || numberOfItems === 0) return (<></>)

  return (
    <ShopLayout
      title={`Carrito - ${titleFormat}`}
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
        Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />

              <Box
                sx={{
                  mt: 3
                }}
              >
                <Button
                  onClick={() => push('/checkout/summary')}
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                >
                  Continuar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage
