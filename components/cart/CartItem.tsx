import NextLink from 'next/link'

import {
  Grid,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Button,
  Link
} from '@mui/material'

import { ICartProduct } from '../../interfaces'
import { ProductItemCounter } from '../ui'
import { FC, useContext } from 'react'
import { CartContext } from '../../context'

interface Props {
  product: ICartProduct
  editable: boolean
}

export const CartItem: FC<Props> = ({ product, editable }) => {
  const { updateProductCart } = useContext(CartContext)

  const handleUpdateQuantity = (quantity: number) => {
    updateProductCart({ ...product, quantity })
  }

  return (
    <Grid spacing={1} container sx={{ mb: 1 }}>
      <Grid item xs={3}>
        {/*  TODO: llevar a la página del producto */}
        <NextLink href={`/product/${product.slug}`}>
          <Link>
            <CardActionArea>
              <CardMedia
                image={`/products/${product.image}`}
                component="img"
                sx={{ borderRadius: '10px' }}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Grid>

      <Grid item xs={7}>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{product.title} </Typography>
          <Typography variant="body1">
            Talla: <strong>M</strong>{' '}
          </Typography>

          {/* Condicional */}
          {editable ? (
            <ProductItemCounter
              currentValue={product.quantity}
              updatedQuantity={handleUpdateQuantity}
            />
          ) : (
            <Typography variant="h5">3 items</Typography>
          )}
        </Box>
      </Grid>

      <Grid
        item
        xs={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="subtitle1">{`$${product.price}`}</Typography>

        {editable && (
          <Button variant="text" color="secondary">
            Quitar
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
