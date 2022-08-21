import { FC, useState, useEffect } from 'react'

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

interface Props {
  max?: number
  currentValue: number
  updatedQuantity: (quantity: number) => void
}

export const ProductItemCounter: FC<Props> = ({ max = -1, currentValue, updatedQuantity }) => {
  const [itemCount, setItemCount] = useState(currentValue)

  const add = () =>
    setItemCount(last => {
      if (max < 0) return last + 1

      return Math.min(last + 1, max)
    })

  const substract = () => setItemCount(last => Math.max(last - 1, 1))

  useEffect(() => {
    updatedQuantity(itemCount)
  }, [itemCount])
  

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={substract}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {itemCount}
      </Typography>
      <IconButton onClick={add}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
