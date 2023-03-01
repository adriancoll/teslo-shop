import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { FC, useEffect, useReducer } from 'react'

import { AuthContext, authReducer } from '.'
import { ISuccessAuthResponse, IReducedUser, IUser } from '../../interfaces'
import { userApi } from '../../services'
import { signOut, useSession } from 'next-auth/react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export interface AuthState {
  isLoggedIn: boolean
  user?: IReducedUser
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)
  const router = useRouter()
  const { data, status } = useSession()

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (status !== 'authenticated') return

    dispatch({ type: 'Auth - login', payload: data?.user as IUser })
  }, [status, data])

  const loginUser = async (email: string, password: string) => {
    try {
      const { data } = await userApi.post<ISuccessAuthResponse>('/login', {
        email,
        password
      })
      const { token, user } = data
      Cookies.set('token', token)
      enqueueSnackbar(`Bienvenid@, ${user.name}`, { variant: 'success' })
      dispatch({ type: 'Auth - login', payload: user })
      return true
    } catch (err) {
      return false
    }
  }

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{
    hasError: boolean
    message?: string
  }> => {
    try {
      const { data } = await userApi.post<ISuccessAuthResponse>('/register', {
        email,
        password,
        name
      })
      const { token, user } = data
      Cookies.set('token', token)
      enqueueSnackbar(`Cuenta, ${user.name} creada correctamente!`, {
        variant: 'success'
      })
      dispatch({ type: 'Auth - login', payload: user })
      // TODO: return
      return { hasError: false }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          //@ts-ignore
          message: error.response?.data?.message
        }
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario, inténtalo de nuevo.'
      }
    }
  }

  const logoutUser = () => {
    Cookies.remove('cart')
    Cookies.remove('firstName')
    Cookies.remove('lastName')
    Cookies.remove('address')
    Cookies.remove('address2')
    Cookies.remove('zip')
    Cookies.remove('city')
    Cookies.remove('country')
    Cookies.remove('phone')

    signOut()

    /**
     * @deprecated NextAuth implemented
     */
    //Cookies.remove('token')
    //router.reload()
  }

  const checkToken = async () => {
    if (!Cookies.get('token')) return

    try {
      const { data } = await userApi.post<ISuccessAuthResponse>(
        '/validate-token'
      )
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - login', payload: user })
    } catch (err) {
      logoutUser()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        loginUser,
        logoutUser,
        registerUser,
        checkToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
