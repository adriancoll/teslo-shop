import { FC, useReducer } from 'react'

import { AuthContext, authReducer } from '.'
import { IUser } from '../../interfaces'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: true,
  user: undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)

  const loginUser = (payload: IUser) =>
    dispatch({ type: 'Auth - login', payload })

  const registerUser = () => dispatch({ type: 'Auth - logout' })

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        loginUser,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
