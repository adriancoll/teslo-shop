import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { FC } from 'react'

interface Props {
  isPaid: boolean
}

export const OrderStatusChip: FC<Props> = ({ isPaid }) => {
  return (
    <Chip
      sx={{ my: 2 }}
      label={isPaid ? 'Orden pagada' : 'Pendiente de pago'}
      variant="outlined"
      color={isPaid ? 'success' : 'error'}
      icon={isPaid ? <CreditScoreOutlined /> : <CreditCardOffOutlined />}
    />
  )
}
