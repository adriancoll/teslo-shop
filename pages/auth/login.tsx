import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn
} from 'next-auth/react'

import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { AuthLayout } from '../../components/layouts'
import { ProviderIcon } from '../../components/ui/ProviderIcon'

type FormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()

  const [showError, setShowError] = useState(false)

  const [providers, setProviders] = useState<any>({})

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    await signIn('credentials', { email, password })
  }

  return (
    <AuthLayout pageDescription="Iniciar Sesión" title="Teslo - Iniciar Sesión">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password')}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink legacyBehavior href="/auth/register" passHref>
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
            <Grid
              item
              xs={12}
              flexDirection="column"
              display="flex"
              justifyContent="end"
            >
              <Divider sx={{ width: '100%', mb: 2 }} />
              {Object.values(providers).map(({ id, name }) => {
                if (id === 'credentials') return <div key="credentials"></div>

                return (
                  <Button
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    sx={{ mb: 1 }}
                    onClick={() => signIn(id)}
                    startIcon={<ProviderIcon provider={id} />}
                    key={id}
                  >
                    {name}
                  </Button>
                )
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx)

  console.log({ session })

  const { p = '/' } = ctx.query

  if (session) {
    return {
      props: {},
      redirect: {
        destination: p,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default LoginPage
