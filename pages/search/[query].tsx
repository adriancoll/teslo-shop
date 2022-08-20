import { GetServerSideProps, NextPage } from 'next'

import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { searchProducts } from '../../database'
import { IProducts } from '../../interfaces'

interface Props {
  query: string
  products: IProducts[]
}

const SearchPage: NextPage<Props> = ({ query, products }) => (
  <ShopLayout
    title="Teslo-Shop - Home"
    pageDescription="Encuentra los mejores productos de Teslo aquí"
  >
    <Typography variant="h1" component="h1">
      Buscar producto
    </Typography>
    <Typography variant="h2" sx={{ mb: 1 }}>
      Resultados de búsqueda para: {query}
    </Typography>

    <ProductList products={products} />
  </ShopLayout>
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  const products = await searchProducts(query)

  return {
    props: {
      query,
      products
    }
  }
}

export default SearchPage
