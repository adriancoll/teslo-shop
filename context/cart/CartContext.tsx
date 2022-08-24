import { createContext } from 'react'
import { ICartProduct } from '../../interfaces'
import { ShippingAddress } from './CartProvider'

export interface CartContextProps {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subtotal: number
  tax: number
  total: number

  shippingAddress: ShippingAddress

  // methods
  addProductToCart: (payload: ICartProduct) => void
  updateProductCart: (payload: ICartProduct) => void
  removeProductFromCartById: (payload: ICartProduct) => void
  updateShippingAddress: (payload: ShippingAddress) => void
}

export const CartContext = createContext({} as CartContextProps)
