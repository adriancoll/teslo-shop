import { Grid } from '@mui/material'
import { OrderSummaryRow } from './OrderSummaryRow'

export const OrderSummary = () => {
  return (
    <Grid container>
      <OrderSummaryRow title="No. Products" content="3 productos" />

      <OrderSummaryRow title="Subtotal" content={`$${155.34}`} />

      <OrderSummaryRow title="Impuestos (15%)" content={`$${34.34}`} />

      <OrderSummaryRow
        title="Total:"
        content={`$${186.34}`}
        variant="subtitle1"
        containerSX={{ mt: 2 }}
      />
    </Grid>
  )
}
