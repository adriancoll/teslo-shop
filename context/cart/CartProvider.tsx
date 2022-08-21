import { FC, PropsWithChildren, useReducer } from 'react'
import { ICartProduct } from '../../interfaces'
import { CartContext } from './CartContext'
import { cartReducer } from './cartReducer'

export interface CartState {
  cart: ICartProduct[]
}

const CART_INITIAL_STATE = {
  cart: []
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  const addProductToCart = (payload: ICartProduct) => dispatch({ type: 'Cart - Add product', payload });

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
