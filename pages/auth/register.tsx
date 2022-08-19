import NextLink from 'next/link'

import { Box, Grid, Typography, Link, TextField, Button } from '@mui/material'
import { AuthLayout } from '../../components/layouts'

const RegisterPage = () => {
  return (
    <AuthLayout title="Crear cuenta" pageDescription="">
      <Box sx={{ width: 700, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Crear cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField variant="filled" label="Nombre completo" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="filled" label="Correo" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              type="password"
              label="Contraseña"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              type="password"
              label="Confirmar contraseña"
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
    </AuthLayout>
  )
}

export default RegisterPage
