import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import useSWR from 'swr'

import { tesloApi } from '../../api'
import { IUser } from '../../interfaces'

export const useAdminPanelUsers = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users')
  const [users, setUsers] = useState<IUser[]>([])

  const onRoleUpdated = async (data: { userId: string; role: string }) => {
    const prevUsers = users.map(user => ({ ...user }))

    const updatedUsers = users.map(user => ({
      ...user,
      role: data.userId === user._id ? data.role : user.role
    }))

    setUsers(updatedUsers)

    try {
      await tesloApi.put('/admin/users', data)
    } catch (error) {
      setUsers(prevUsers)
      alert('No se pudo actualizar el rol')
      if (isAxiosError(error)) {
        console.error(error.response!.data)
        return
      }
    }
  }

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

  return {
    data,
    error,
    onRoleUpdated,
    users
  }
}
