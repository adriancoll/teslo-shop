import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'
import { GetSessionParams, getSession, signIn } from 'next-auth/react'

import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../../components/layouts'

type FormData = {
  email: string
  password: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

const LoginPage = () => {
  const router = useRouter()

  const [showError, setShowError] = useState(false)

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
    <AuthLayout pageDescription="Iniciar Sesión" title="Ingresar">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField label="Correo" variant="filled" fullWidth {...register('email')} />
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
                type='submit'
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink legacyBehavior href="/auth/register" passHref>
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
