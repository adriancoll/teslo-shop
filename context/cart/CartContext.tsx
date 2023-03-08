import { createContext } from 'react'
import { ICartProduct, TShippingAddress } from '../../interfaces'

interface ContextProps {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number

  shippingAddress?: TShippingAddress

  // Methods
  addProductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  removeCartProduct: (product: ICartProduct) => void
  updateAddress: (address: TShippingAddress) => void

  // Orders
  createOrder: () => Promise<{
    hasError: boolean
    message: string
  }>;
}

export const CartContext = createContext({} as ContextProps)
