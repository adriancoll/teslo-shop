import NextLink from 'next/link'

import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { AuthLayout } from '../../components/layouts'

const LoginPage = () => {
  return (
    <AuthLayout
      title="Iniciar sesión"
      pageDescription="Iniciar sesión en Teslo Shop"
    >
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Iniciar Sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField variant="filled" label="Correo" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              type="password"
              label="Contraseña"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular"
              size="large"
              fullWidth
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
    </AuthLayout>
  )
}

export default LoginPage
