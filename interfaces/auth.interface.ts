import { IReducedUser } from './user.interface'

export interface ISuccessAuthResponse {
  token: string
  user: IReducedUser
}
