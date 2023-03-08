import { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import {
  Link,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip
} from '@mui/material'

import { ShopLayout } from '../../components/layouts/ShopLayout'
import { CartList, OrderSummary, AddressSummary } from '../../components/cart'
import { useCart } from '../../hooks'

const SummaryPage = () => {
  const router = useRouter()
  const { shippingAddress, numberOfItems, createOrder } = useCart()

  const [errorMessage, setErrorMessage] = useState('')
  const [isPosting, setIsPosting] = useState(false)

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address')
    }
  }, [router])

  const onCreateOrder = async () => {
    setIsPosting(true)

    const { hasError, message } = await createOrder()

    if (hasError) {
      setIsPosting(false)
      setErrorMessage(message)
      return;
    }

    router.replace(`/orders/${message}`)
  }



  return (
    <ShopLayout
      title="Resumen de orden"
      pageDescription={'Resumen de la orden'}
    >
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{' '}
                {numberOfItems === 1 ? 'producto' : 'productos'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <AddressSummary />

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column" gap={1}>
                <Button
                  disabled={isPosting}
                  onClick={onCreateOrder}
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                >
                  Confirmar Orden
                </Button>

                <Chip
                  sx={{ display: errorMessage ? 'flex' : 'none' }}
                  color="error"
                  label={errorMessage}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
