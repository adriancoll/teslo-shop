import { FC, PropsWithChildren, useReducer } from 'react'
import { ICartProduct } from '../../interfaces'
import { CartContext } from './CartContext'

export interface CartState {
  cart: ICartProduct[]
}

const CART_INITIAL_STATE = {
  cart: []
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  return (
    <CartContext.Provider
      value={{
        ..state
      }}
    ></CartContext.Provider>
  )
}
