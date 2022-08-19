import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
  Chip
} from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'

const OrderPage = () => {
  const router = useRouter()

  const { id } = router.query as { id: string }

  return (
    <ShopLayout
      title={`Resumen del pedido ${id}`}
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1">
        Pedido: {id}
      </Typography>

      {/* <Chip
        sx={{ my: 2, p: 1 }}
        variant="outlined"
        label="Pendiente de pago"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2, p: 1 }}
        variant="outlined"
        label="Orden ya pagado"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href={'/checkout/address'}>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography>Adrián coll suarez</Typography>
              <Typography>123 avda</Typography>
              <Typography>Patio 23 puerta 2</Typography>
              <Typography>Valencia, España</Typography>
              <Typography>+34 600 00 00 00</Typography>

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
                {/* TODO */}
                <h1>PAGAR</h1>

                <Chip
                  sx={{ my: 2, p: 1 }}
                  variant="outlined"
                  label="Orden ya pagado"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage
