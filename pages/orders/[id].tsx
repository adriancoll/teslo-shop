import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { getSession } from 'next-auth/react'

import {
  Link,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  CircularProgress
} from '@mui/material'

import { PayPalButtons } from '@paypal/react-paypal-js'

import { ShopLayout } from '../../components/layouts/ShopLayout'
import { CartList, OrderSummary } from '../../components/cart'
import { AddressSummary } from '../../components/cart'
import { dbOrders } from '../../database'
import { IOrder } from '../../interfaces'
import { OrderStatusChip } from '../../components/orders'
import { IPaypal } from '../../interfaces'
import { tesloApi } from '../../api'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter()

  const [isPaying, setIsPaying] = useState(false)

  let {
    isPaid,
    numberOfItems,
    orderItems,
    shippingAddress,
    subTotal,
    tax,
    total,
    _id: orderId,
    paidAt,
    paymentResult,
    user
  } = order

  const onOrderCompleted = async (details: IPaypal.OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('No hay pago en Paypal')
    }

    setIsPaying(true)

    try {
      await tesloApi.post<{ message: string }>('/orders/pay', {
        transactionId: details.id,
        orderId: orderId
      })

      router.reload()
    } catch (error) {
      setIsPaying(false)
      console.error(error)
    }
  }

  return (
    <ShopLayout
      title={`Resumen de la orden ${orderId}`}
      pageDescription={'Resumen de la orden'}
    >
      <Typography variant="h1" component="h1">
        Orden: {orderId}
      </Typography>

      <OrderStatusChip isPaid={isPaid} />

      <Grid container className="fadeIn">
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

                <Box
                  display="flex"
                  justifyContent="center"
                  className="fadeIn"
                  sx={{
                    display: isPaying ? 'flex' : 'none'
                  }}
                >
                  <CircularProgress />
                </Box>

                <Box flexDirection='column' sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}>
                  {isPaid ? (
                    <OrderStatusChip isPaid={isPaid} />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.total.toString()
                              }
                            }
                          ]
                        })
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then(onOrderCompleted)
                      }}
                    />
                  )}
                </Box>
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
