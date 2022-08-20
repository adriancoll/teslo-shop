import { GetServerSideProps, NextPage } from 'next'

import { Box, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { dbProducts } from '../../database'
import { IProducts } from '../../interfaces'

interface Props {
  query: string
  products: IProducts[]
  foundProducts: boolean
}

const SearchPage: NextPage<Props> = ({ query, products, foundProducts }) => (
  <ShopLayout
    title="Teslo-Shop - Home"
    pageDescription="Encuentra los mejores productos de Teslo aquí"
  >
    <Typography variant="h1" component="h1">
      Buscar producto
    </Typography>

    {foundProducts ? (
      <Typography textTransform='capitalize' variant="h2" sx={{ mb: 1 }}>
        Término : {query}
      </Typography>
    ) : (
      <Box display="flex">
        <Typography variant="h2" sx={{ mb: 1 }}>
          No encontramos ningún producto
        </Typography>
        <Typography variant="h2" color="secondary" sx={{ ml: 1 }}>
          {query}
        </Typography>
      </Box>
    )}

    <ProductList products={products} />
  </ShopLayout>
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  const redirectObj = {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
  
  if (query.length === 0) return redirectObj

  let products = await dbProducts.getProductsByTerm(query)
  const foundProducts = products.length > 0

  if (!foundProducts) products = await dbProducts.getAllProducts()

  return {
    props: {
      query,
      products,
      foundProducts
    }
  }
}

export default SearchPage
