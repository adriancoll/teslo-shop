import { NextPage } from 'next'
import { AdminLayout } from '../../components/layouts'
import { DashboardOutlined } from '@mui/icons-material'

const DashboardPage: NextPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadísticas generales"
      icon={<DashboardOutlined />}
    >
        <h3>Hola mundo</h3>
    </AdminLayout>
  )
}

export default DashboardPage
