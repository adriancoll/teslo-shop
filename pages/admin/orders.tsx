import React from 'react'
import { AdminLayout } from '../../components/layouts'
import { ConfirmationNumberOutlined } from '@mui/icons-material'

const OrdersPage = () => {
  return (
    <AdminLayout title='Ordenes' icon={<ConfirmationNumberOutlined />} subTitle='Mantenimiento de ordenes'>OrdersPage</AdminLayout>
  )
}

export default OrdersPage