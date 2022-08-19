import NextLink from 'next/link'

import { Chip, Grid, Typography, Link } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  esES
} from '@mui/x-data-grid'

import { ShopLayout } from '../../components/layouts'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'fullname',
    headerName: 'Nombre completo',
    width: 300
  },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Informacion de pago',
    width: 150,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip variant="outlined" color="success" label="Pagado" />
      ) : (
        <Chip variant="outlined" color="error" label="No pagado" />
      )
    }
  },
  {
    field: 'order',
    headerName: 'Ver detalle',
    description: 'Detalles del pedido',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`}>
          <Link underline="always" color="secondary">
            Ver detalle
          </Link>
        </NextLink>
      )
    }
  }
]

const rows = [
  { id: 1, paid: false, fullname: 'Adrian Coll' },
  { id: 2, paid: true, fullname: 'Luis' },
  { id: 3, paid: false, fullname: 'Iván' },
  { id: 4, paid: true, fullname: 'Alejo' },
  { id: 5, paid: false, fullname: 'Jaiden' },
  { id: 6, paid: true, fullname: 'Daniela' },
  { id: 7, paid: false, fullname: 'Dani' },
  { id: 8, paid: false, fullname: 'Lorenzo' }
]

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de compras"
      pageDescription="Historial de compras"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container sx={{ height: 650, width: '100%', mt: 5 }}>
        <Grid item sx={{ height: 650, width: '100%' }}>
          <DataGrid
            components={{ Toolbar: GridToolbar }}
            experimentalFeatures={{ newEditingApi: true }}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
