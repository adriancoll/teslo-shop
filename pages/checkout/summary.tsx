import NextLink from 'next/link'

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography
} from '@mui/material'
import React, { useContext } from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context'

const SummaryPage = () => {
  const { cart, shippingAddress } = useContext(CartContext)

  const mutableItemString = cart.length > 1 ? 'productos' : 'producto'

  return (
    <ShopLayout title="Resumen de compra" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
        Resumen del pedido
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({cart.length} {mutableItemString})
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href={'/checkout/address'}>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography>{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</Typography>
              <Typography>{shippingAddress.address}</Typography>
              {shippingAddress.address2 && (
                <Typography>{shippingAddress.address2}</Typography>
              )}
              <Typography>{shippingAddress.city}, {shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href={'/cart'}>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box
                sx={{
                  mt: 3
                }}
              >
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar pedido
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
