import { useContext, useState } from 'react'

import NextLink from 'next/link'

import { Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils'
import { userApi } from '../../services'
import { IUser, UserRoles } from '../../interfaces'
import { useSnackbar } from 'notistack'

import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined'
import { AuthContext } from '../../context/auth'
import { useRouter } from 'next/router'

type FormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)

  const [showError, setShowError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const router = useRouter()

  const onSubmit = async ({ email, password }: FormData) => {
    setShowError(false)

    const isValid = await loginUser(email, password)

    console.log({ isValid })

    if (!isValid) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    const destination = router.query.p?.toString() || '/'
    router.replace(destination)
  }

  return (
    <AuthLayout
      title="Iniciar sesión"
      pageDescription="Iniciar sesión en Teslo Shop"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              {showError && (
                <Chip
                  label="No reconocemos ese usuario / contraseña"
                  color="error"
                  icon={<NoAccountsOutlinedIcon />}
                  className="fadeIn"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                label="Correo"
                fullWidth
                {...register('email', {
                  required: true,
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={!!errors.email && errors.email.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                type="password"
                label="Contraseña"
                error={!!errors.password}
                helperText={!!errors.password && errors.password.message}
                fullWidth
                {...register('password', {
                  required: 'La contraseña no puede estar vacía',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular"
                size="large"
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <NextLink href="/auth/register" passHref>
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
