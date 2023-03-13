import { GetServerSideProps, NextPage } from 'next'
import { db } from '../../../database'
import Order from '../../../models/Order'
import { IOrder } from '../../../interfaces'
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  CircularProgress,
  Link,
  IconButton,
  Breadcrumbs
} from '@mui/material'
import { PayPalButtons } from '@paypal/react-paypal-js'
import NextLink from 'next/link'
import {
  CartList,
  AddressSummary,
  OrderSummary
} from '../../../components/cart'
import { AdminLayout, ShopLayout } from '../../../components/layouts'
import { OrderStatusChip } from '../../../components/orders'
import { ConfirmationNumberOutlined } from '@mui/icons-material'

interface Props {
  order: IOrder
}

const OrderDetailPage: NextPage<Props> = ({ order }) => {
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

  return (
    <AdminLayout
      title={'Detalles de la orden'}
      subTitle={`Orden: ${orderId}`}
      icon={<ConfirmationNumberOutlined />}
    >
      <Box display="flex" flexDirection="column" justifyItems="center" my={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <NextLink legacyBehavior href="/admin">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
          </NextLink>
          <NextLink legacyBehavior href="/admin/orders">
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Ordenes
            </Link>
          </NextLink>
          <Typography color="text.primary">{orderId}</Typography>
        </Breadcrumbs>
        <Box>
          <OrderStatusChip isPaid={isPaid} />
        </Box>
      </Box>

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
                <Box flexDirection="column" display="flex" sx={{ flex: 1 }}>
                  <OrderStatusChip isPaid={isPaid} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  await db.connect()

  const order = await Order.findById(id)

  await db.disconnect()

  if (!order)
    return {
      redirect: {
        destination: '/admin/orders'
      },
      props: {}
    }

  return {
    props: { order: JSON.parse(JSON.stringify(order)) }
  }
}

export default OrderDetailPage
