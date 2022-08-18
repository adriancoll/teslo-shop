import { Grid, SxProps, Theme, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { FC } from 'react'

interface Props {
  title: string
  content: any
  variant?: Variant | 'inherit'
  containerSX?: SxProps<Theme>
}

export const OrderSummaryRow: FC<Props> = ({
  title,
  content,
  variant = 'inherit',
  containerSX = {}
}) => (
  <>
    <Grid sx={containerSX} item xs={6}>
      <Typography variant={variant}>{title}</Typography>
    </Grid>

    <Grid sx={containerSX} item xs={6} display="flex" justifyContent="end">
      <Typography variant={variant}>{content}</Typography>
    </Grid>
  </>
)
