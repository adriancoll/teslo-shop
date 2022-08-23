import NextLink from 'next/link'

import {
  Box,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Chip
} from '@mui/material'
import { AuthLayout } from '../../components/layouts'
import { useSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { userApi } from '../../services'
import { UserRoles } from '../../interfaces'

import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined'
import { validations } from '../../utils'

type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterPage = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [showError, setShowError] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false)
    try {
      const { data } = await userApi.post<{
        token: string
        user: {
          email: string
          name: string
          role: UserRoles
        }
      }>('/register', { email, password, name })

      const { token, user } = data

      enqueueSnackbar(`Cuenta creada correctamente, ${user.name}`, {
        variant: 'success'
      })
    } catch ({ message }) {
      setShowError(true)

      setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <AuthLayout title="Crear cuenta" pageDescription="">
      <form onSubmit={handleSubmit(onRegisterForm)}>
        <Box sx={{ width: 700, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>

              {showError && (
                <Chip
                  label="Se ha producido un error, comprueba que los datos sean correctos"
                  color="error"
                  icon={<NoAccountsOutlinedIcon />}
                  className="fadeIn"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                label="Nombre completo"
                fullWidth
                {...register('name', {
                  required: 'Debes introducir tu nombre'
                })}
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                label="Correo"
                fullWidth
                {...register('email', {
                  required: 'Debes introducir un email',
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                type="password"
                label="Contraseña"
                fullWidth
                {...register('password', {
                  required: 'Debes introducir una contraseña',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 carácteres'
                  }
                })}
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                type="password"
                label="Confirmar contraseña"
                fullWidth
                {...register('confirmPassword', {
                  required: 'Por favor comprueba que tu contraseña coincida',
                  validate: value =>
                    value === password.current || 'Las contraseñas no coinciden'
                })}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword && errors.confirmPassword.message
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular"
                size="large"
                type="submit"
                fullWidth
              >
                Regístrate
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <NextLink href="/auth/login" passHref>
                <Link underline="always">¿Ya tienes una cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
