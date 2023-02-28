import { BaseEntity } from '.'

export type UserRoles = 'client' | 'admin'

export interface IUser extends BaseEntity {
  name: string
  email: string
  password: string
  role: UserRoles
  provider: string
  image?: string
}

export interface IReducedUser {
  email: string
  name: string
  role: UserRoles
  image?: string
}
