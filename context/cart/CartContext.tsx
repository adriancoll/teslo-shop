import { createContext } from 'react'
import { ICartProduct } from '../../interfaces'

export interface CartContextProps {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subtotal: number
  tax: number
  total: number

  // methods
  addProductToCart: (payload: ICartProduct) => void
  updateProductCart: (payload: ICartProduct) => void
  removeProductFromCartById: (payload: ICartProduct) => void
}

export const CartContext = createContext({} as CartContextProps)
