import { createContext } from 'react'
import { IReducedUser, IUser } from '../../interfaces'

export interface AuthContextProps {
  isLoggedIn: boolean
  user?: IReducedUser

  // Methods
  loginUser: (email: string, password: string) => Promise<boolean>
  logoutUser: () => void
  checkToken: () => void
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean
    message?: string
  }>
}

export const AuthContext = createContext({} as AuthContextProps)
