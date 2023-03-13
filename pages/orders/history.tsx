import NextLink from 'next/link'
import { GetServerSideProps, NextPage } from 'next'

import { Typography, Grid, Chip, Link } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { ShopLayout } from '../../components/layouts'
import { getSession } from 'next-auth/react'
import { dbOrders } from '../../database'
import { THistoryOrder } from '../../interfaces'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: ({ row }) => {
      return row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      )
    }
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: ({ row }) => (
      <NextLink href={`/orders/${row.orderId}`} passHref legacyBehavior>
        <Link underline="always">Ver orden</Link>
      </NextLink>
    )
  }
]

interface Props {
  orders: THistoryOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => (
  <ShopLayout
    title={'Historial de ordenes'}
    pageDescription={'Historial de ordenes del cliente'}
  >
    <Typography variant="h1" component="h1">
      Historial de ordenes
    </Typography>

    <Grid container className="fadeIn">
      <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Grid>
    </Grid>
  </ShopLayout>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req })

  const userId = session.user._id

  const orders = await dbOrders.getHistoryOrdersByUser(userId)

  return {
    props: { orders }
  }
}

export default HistoryPage
