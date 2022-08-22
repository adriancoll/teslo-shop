import { useContext, useState } from 'react'

import { GetStaticPaths, NextPage, GetStaticProps } from 'next'

import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductSizeSelector, SlideShow } from '../../components/products'
import { ProductItemCounter } from '../../components/ui'

import { ICartProduct, IProducts, ISize } from '../../interfaces'
import {
  getAllProductsSlugs,
  getProductBySlug
} from '../../database/dbProducts'
import { CartContext } from '../../context'

import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

interface Props {
  product: IProducts
}

const ProductDetailPage: NextPage<Props> = ({ product }) => {
  const { enqueueSnackbar } = useSnackbar()

  const router = useRouter()

  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    title: product.title,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    type: product.type,
    gender: product.gender,
    inStock: product.inStock,
    quantity: 1
  })

  const handleSizeChange = (size: ISize) => {
    setTempCartProduct(oldTempCartProduct => ({
      ...oldTempCartProduct,
      size
    }))
  }

  const handleQuantityChange = (quantity: number) => {
    setTempCartProduct(oldTempCartProduct => ({
      ...oldTempCartProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) return
    console.log('onAddProduct', { tempCartProduct })

    addProductToCart(tempCartProduct)
    enqueueSnackbar(`${product.title} agregado al carrito`, {
      variant: 'success'
    })
    router.push('/cart')
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* slideshow */}
          <SlideShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ProductItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={handleQuantityChange}
                max={product.inStock > 10 ? 10 : product.inStock}
              />
              <ProductSizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSizeChange={handleSizeChange}
              />
            </Box>

            {/* Agregar al carrito */}
            {product.inStock > 0 ? (
              <Button
                onClick={onAddProduct}
                color="secondary"
                className="circular-btn"
                disabled={!tempCartProduct.size}
              >
                {tempCartProduct.size
                  ? 'Agregar al carrito'
                  : 'Selecciona una talla'}
              </Button>
            ) : (
              <Chip
                variant="outlined"
                color="error"
                label="No hay disponibles"
              />
            )}

            {/* Descripcion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción:</Typography>
              <Typography variant="body2">{product.description} </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// STATIC CONTENT

export const getStaticPaths: GetStaticPaths = async ctx => {
  const slugs = await getAllProductsSlugs()

  const paths = slugs.map(({ slug }) => ({
    params: { slug }
  }))

  console.log({ slugs })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }

  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductDetailPage
