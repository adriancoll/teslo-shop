import { NextPage } from 'next'
import useSWR from 'swr'

import { AdminLayout } from '../../components/layouts'

import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined
} from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { IDashboardSummaryResponse } from '../../interfaces/admin'
import { useEffect, useState } from 'react'

const DashboardPage: NextPage = () => {
  const [refreshIn, setRefreshIn] = useState(30)

  const { data, error, isLoading } = useSWR<IDashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000 // 30 sec
      // refreshInterval: lastData => {
      //   return setInterval(() => {}, 1000)
      // }
    }
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => (refreshIn > 0 ? refreshIn - 1 : 30))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) return <CircularProgress />

  if (!error && !data) {
    return <></>
  }

  if (error) {
    console.log({ error })
    return <Typography>Error al cargar la información!</Typography>
  }

  const {
    lowInventory,
    notPaidOrders,
    numberOfClients,
    numberOfOrders,
    numberOfProducts,
    paidOrders,
    productsWithNoInventory
  } = data!

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadísticas generales"
      icon={<DashboardOutlined />}
    >
      <Box sx={{ width: '30%', mt: 2}} display="flex" flexDirection='column'>
        <Typography variant="subtitle2">Refresh in:</Typography>
        <LinearProgress
          sx={{ width: '100%' }}
          variant="determinate"
          color='secondary'
          aria-label="refresh"
          value={Math.round((100 / 30) * refreshIn)}
        />
      </Box>
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          caption="Ordenes totales"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={paidOrders}
          caption="Ordenes pagadas"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={notPaidOrders}
          caption="Ordenes pendientes"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          caption="Clientes"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          caption="Products"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={productsWithNoInventory}
          caption="Sin Existencias"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />
        <SummaryTile
          title={lowInventory}
          caption="Inventario"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />
      </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
