import { BaseEntity } from '.'

export type UserRoles = 'client' | 'admin'

export interface IUser extends BaseEntity {
  name: string
  email: string
  password: string
  role: UserRoles
}
