import { FC, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'

import { ICartProduct } from '../../interfaces'

import { CartContext } from './CartContext'
import { cartReducer } from './cartReducer'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subtotal: number
  tax: number
  total: number
}

const CART_INITIAL_STATE = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0
}

export const CartProvider: FC = ({ children }) => {
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

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    )

    const subtotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    )

    const taxRate = Number(process.env.NEXT_PUBLIC_RATE || 0)

    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (taxRate + 1)
    }

    dispatch({ type: 'Cart - Update order summary', payload: orderSummary })
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
