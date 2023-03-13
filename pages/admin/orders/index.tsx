import useSWR from 'swr'

import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, CircularProgress, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { IOrder, IUser } from '../../../interfaces'
import { AdminLayout } from '../../../components/layouts'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Orden ID', width: 250 },
  { field: 'email', headerName: 'Correo', width: 250 },
  { field: 'name', headerName: 'Nombre completo', width: 300 },
  { field: 'total', headerName: 'Precio total', width: 300 },
  {
    field: 'isPaid',
    headerName: 'Pagado',
    renderCell: ({ row }) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Pagada" color="success" />
      ) : (
        <Chip variant="outlined" label="Pendiente" color="error" />
      )
    }
  },
  {
    field: 'numberOfItems',
    headerName: 'No.Productos',
    align: 'center'
  },
  {
    field: 'check',
    headerName: 'Detalle',
    renderCell: ({ row }) => (
      <a
        href={`/admin/orders/${row.id}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        Ver orden
      </a>
    )
  },
  {
    field: 'createdAt',
    headerName: 'Fecha de creación',
    width: 300,
    renderCell: ({ row }) => <Typography component="time" variant='body2' >{new Date(row.createdAt).toLocaleDateString('es-ES')} - {new Date(row.createdAt).toLocaleTimeString('es-ES')}</Typography>
  }
]

const OrdersPage = () => {
  const { data, error, isLoading } = useSWR<IOrder[]>('/api/admin/orders')

  if ((!data && !error))
    return <CircularProgress color="secondary" />

  const rows = data!.map(order => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    numberOfItems: order.numberOfItems,
    createdAt: order.createdAt
  }))

  return (
    <AdminLayout
      title="Ordenes"
      icon={<ConfirmationNumberOutlined />}
      subTitle="Mantenimiento de ordenes"
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={isLoading}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default OrdersPage
