import { Box, Grid, Link, Typography } from '@mui/material'
import { useCart } from '../../hooks'
import NextLink from 'next/link'
import { TShippingAddress } from '../../interfaces'
import { FC } from 'react'

interface Props { staticAddress?: TShippingAddress }

export const AddressSummary: FC<Props> = ({ staticAddress }) => {
  const { shippingAddress } = useCart()

  if (!shippingAddress && !staticAddress) return <></>

  const {
    firstName,
    address2 = '',
    lastName,
    address,
    country,
    phone,
    city,
    zip
  } = shippingAddress! || staticAddress!

  return (
    <Grid flexDirection='column' container>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Dirección de entrega</Typography>
        <NextLink href="/checkout/address" passHref legacyBehavior>
          <Link underline="always">Editar</Link>
        </NextLink>
      </Box>

      <Typography>
        {firstName} {lastName}
      </Typography>
      <Typography>
        {address}
        {address2 ? `, ${address2}` : ''}{' '}
      </Typography>
      <Typography>
        {city}, {zip}
      </Typography>
      {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}
      <Typography>{country}</Typography>
      <Typography>{phone}</Typography>
    </Grid>
  )
}
