import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'

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

  // Efecto
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : []
      dispatch({
        type: 'Cart - Load cart from cookies | storage',
        payload: cookieProducts
      })
    } catch (error) {
      dispatch({
        type: 'Cart - Load cart from cookies | storage',
        payload: []
      })
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

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
    dispatch({ type: 'Cart - remove product', payload })

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
