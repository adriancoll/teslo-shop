import { NextPage } from 'next'

import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { countries } from '../../utils'
import { Controller, useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { CartContext, ShippingAddress } from '../../context'
import { useContext, useEffect } from 'react'

const getAddressFromCookies = (): ShippingAddress => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || ''
  }
}

const AddressPage: NextPage = () => {
  const router = useRouter()

  const { updateShippingAddress } = useContext(CartContext)

  const onSubmit = (data: ShippingAddress) => {
    updateShippingAddress(data)

    router.push('/checkout/summary')
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ShippingAddress>({
    defaultValues: getAddressFromCookies()
  })

  return (
    <ShopLayout
      title="Dirección"
      pageDescription="Confirmar dirección del destino"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" component="h1">
          Dirección
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register('firstName', { required: 'El nombre es requerido' })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellidos"
              variant="filled"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register('lastName', {
                required: 'Los apellidos son requeridos'
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register('address', {
                required: 'La dirección es requerida'
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2 (opcional)"
              variant="filled"
              fullWidth
              {...register('address2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Código postal"
              type="number"
              variant="filled"
              fullWidth
              helperText={errors.zip?.message}
              error={!!errors.zip}
              {...register('zip', {
                required: 'El código postal es requerido'
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              helperText={errors.city?.message}
              error={!!errors.city}
              {...register('city', { required: 'La ciudad es requerida' })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="country"
                rules={{
                  required: 'Este campo es requerido'
                }}
                defaultValue={Cookies.get('country') || countries[0].code}
                render={({ field }) => (
                  <TextField
                    select
                    variant="filled"
                    label="País"
                    error={!!errors.country}
                    {...field}
                    // helperText={ errors.country?.message }
                  >
                    {countries.map(country => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register('phone', { required: 'El teléfono es requerido' })}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            size="large"
            color="secondary"
            className="circular-btn"
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

export default AddressPage
