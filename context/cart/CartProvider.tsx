import { FC, PropsWithChildren, useReducer } from 'react'
import { ICartProduct } from '../../interfaces'
import products from '../../pages/api/products'
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

  const addProductToCart = (payload: ICartProduct) => {
    const productStored: ICartProduct = state.cart.filter(
      oldProduct =>
        oldProduct._id === payload._id && oldProduct.size === payload.size
    )[0]

    if (!productStored) {
      return dispatch({ type: 'Cart - Add product', payload })
    }

    payload.quantity += productStored.quantity

    return dispatch({ type: 'Cart - Update product', payload })
  }

  const updateProductCart = (payload: ICartProduct) =>
    dispatch({ type: 'Cart - Update product', payload })

  const removeProductFromCartById = (payload: ICartProduct) =>
    dispatch({ type: 'Cart - remove product by id', payload })

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProductToCart,
        updateProductCart,
        removeProductFromCartById
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
