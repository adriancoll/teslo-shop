import React, { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'

import { PeopleOutline } from '@mui/icons-material'
import { Grid, MenuItem, Select } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid'

import { useAdminPanelUsers } from '../../hooks/admin'

import { AdminLayout } from '../../components/layouts'
import { IUser } from '../../interfaces'
import { tesloApi } from '../../api'

const AdminUsersPage = () => {
  const { data, error, onRoleUpdated, users } = useAdminPanelUsers()

  const columns: GridColDef[] = [
    {
      field: 'email',
      headerName: 'Correo',
      width: 250
    },
    {
      field: 'name',
      headerName: 'Nombre Completo',
      width: 300
    },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            label="Rol"
            onChange={({ target }) =>
              onRoleUpdated({
                userId: row.id,
                role: target.value
              })
            }
            value={row.role}
            sx={{ width: '300px' }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
            <MenuItem value="super-user">Super user</MenuItem>
          </Select>
        )
      }
    }
  ]

  if (!data && !error) return <></>

  const rows = users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }))

  return (
    <AdminLayout
      title="Usuarios"
      subTitle="Mantenimiento de usuarios"
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default AdminUsersPage
