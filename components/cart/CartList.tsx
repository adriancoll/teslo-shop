import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
  Button
} from '@mui/material'
import NextLink from 'next/link'
import { FC, useContext } from 'react'
import { CartContext } from '../../context'

import { CartItem } from './CartItem'

interface Props {
  editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart } = useContext(CartContext)

  return (
    <Box>
      {cart.map(product => (
        <CartItem editable={editable} product={product} key={product.slug} />
      ))}
    </Box>
  )
}
