import { CreditCardOffOutlined } from '@mui/icons-material'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import { FC } from 'react'

interface Props {
  title: string | number
  caption: string
  icon?: JSX.Element
}

export const SummaryTile: FC<Props> = ({ title, caption, icon }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: 'flex' }}>
        <CardContent
          sx={{
            width: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {icon}
        </CardContent>{' '}
        <CardContent
          sx={{
            flex: '1 0 flex',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h3">{title}</Typography>
          <Typography variant="caption">{caption}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
