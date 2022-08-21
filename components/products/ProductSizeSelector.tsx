import { Box, Button } from '@mui/material'
import { Dispatch, FC, SetStateAction } from 'react'
import { ISize } from '../../interfaces'

interface Props {
  sizes: ISize[]
  selectedSize?: ISize
  onSizeChange: (size: ISize) => void
}

export const ProductSizeSelector: FC<Props> = ({ selectedSize = null, sizes, onSizeChange }) => {
  return (
    <Box>
      {sizes.map(size => (
        <Button
          key={size}
          size="small"
          onClick={() => onSizeChange(size)}
          color={selectedSize === size ? 'primary' : 'info'}
        >
          {size}
        </Button>
      ))}
    </Box>
  )
}
