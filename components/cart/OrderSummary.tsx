import { useContext } from 'react'

import { Grid } from '@mui/material'
import { CartContext } from '../../context'
import { OrderSummaryRow } from './OrderSummaryRow'
import { currency } from '../../utils'

export const OrderSummary = () => {
  const { numberOfItems, subtotal, total, tax } = useContext(CartContext)

  const mutableItemsString = numberOfItems !== 1 ? 'productos' : 'producto'

  return (
    <Grid container>
      <OrderSummaryRow
        title="No. Products"
        content={`${numberOfItems} ${mutableItemsString}`}
      />

      <OrderSummaryRow
        title="Subtotal"
        content={`${currency.format(subtotal)}`}
      />

      <OrderSummaryRow
        title={`Impuestos (${Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)`}
        content={`${currency.format(tax)}`}
      />

      <OrderSummaryRow
        title="Total:"
        content={`${currency.format(total)}`}
        variant="subtitle1"
        containerSX={{ mt: 2 }}
      />
    </Grid>
  )
}
