import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context'

const CartPage = () => {
  const { push } = useRouter()

  const { numberOfItems } = useContext(CartContext)

  const titleFormat =
    numberOfItems === 0
      ? 'Vacío'
      : numberOfItems === 1
      ? '1 producto'
      : `${numberOfItems} productos`

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
