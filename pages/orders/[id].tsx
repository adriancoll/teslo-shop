import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import {
  Link,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip
} from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

import { ShopLayout } from '../../components/layouts/ShopLayout'
import { CartList, OrderSummary } from '../../components/cart'
import { AddressSummary } from '../../components/cart'
import { getSession } from 'next-auth/react'
import { getOrderById } from '../../database/dbOrders'
import { dbOrders } from '../../database'
import { IOrder } from '../../interfaces'
import { OrderStatusChip } from '../../components/orders'

interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const {
    isPaid,
    numberOfItems,
    orderItems,
    shippingAddress,
    subTotal,
    tax,
    total,
    _id: OrderId,
    paidAt,
    paymentResult,
    user
  } = order

  return (
    <ShopLayout
      title={`Resumen de la orden ${OrderId}`}
      pageDescription={'Resumen de la orden'}
    >
      <Typography variant="h1" component="h1">
        Orden: {OrderId}
      </Typography>

      <OrderStatusChip isPaid={isPaid} />

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{' '}
                {numberOfItems === 1 ? 'producto' : 'productos'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <AddressSummary staticAddress={shippingAddress} />

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary
                orderValues={{
                  numberOfItems,
                  subTotal,
                  tax,
                  total
                }}
              />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {/* TODO */}

                {isPaid ? <OrderStatusChip isPaid={isPaid} /> : <h1>Pagar</h1>}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const { id = '' } = query
  const session: any = await getSession({ req })

  //! Deprecated Now moved it into the middleware.ts file
  ////   if (!session && false)
  ////     return {
  ////       redirect: {
  ////         destination: `/auth/login?p=/orders/${id}`,
  ////         permanent: false
  ////       }
  ////     }

  const order = await dbOrders.getOrderById(String(id))

  // if there's no order redirect to /orders/history
  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false
      }
    }
  }

  // if the order user is not the logged user redirect to /orders/history
  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false
      }
    }
  }

  return {
    props: {
      order
    }
  }
}

export default OrderPage
