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
import { FC } from 'react'

import { initialData } from '../../database/products'
import { ProductItemCounter } from '../ui'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

interface Props {
  editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <Box>
      {productsInCart.map(product => (
        <Grid key={product.slug} spacing={2} container sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/*  TODO: llevar a la página del producto */}
            <NextLink href="/product/slug">
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: '5px' }}
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
                <ProductItemCounter />
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

            {
              editable && (
                <Button variant="text" color="secondary">
                  Remover
                </Button>
              )
            }

          </Grid>
        </Grid>
      ))}
    </Box>
  )
}
