import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'

import { ICartProduct, IOrder, TShippingAddress } from '../../interfaces'
import { CartContext, cartReducer } from './'
import { tesloApi } from '../../api'
import axios from 'axios'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number

  shippingAddress?: TShippingAddress
}

export const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  // Load cart from cookies
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : []
      dispatch({
        type: '[Cart] - LoadCart from cookies | storage',
        payload: cookieProducts
      })
    } catch (error) {
      dispatch({
        type: '[Cart] - LoadCart from cookies | storage',
        payload: []
      })
    }
  }, [])

  // Load address from cookies
  useEffect(() => {
    if (Cookie.get('firstName')) {
      const shippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || ''
      }

      dispatch({
        type: '[Cart] - LoadAddress from Cookies',
        payload: shippingAddress
      })
    }
  }, [])

  useEffect(() => {
    if (!state.cart || state.cart.length === 0) return

    Cookie.set('cart', JSON.stringify(state.cart), { expires: 86400 })
  }, [state.cart])

  // Price logics effect
  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    )

    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    )

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
  }, [state.cart])

  const addProductToCart = (product: ICartProduct) => {
    //! Nivel 1
    // dispatch({ type: '[Cart] - Add Product', payload: product });

    //! Nivel 2
    // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
    // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })

    //! Nivel Final
    const productInCart = state.cart.some(p => p._id === product._id)
    if (!productInCart)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product]
      })

    const productInCartButDifferentSize = state.cart.some(
      p => p._id === product._id && p.size === product.size
    )
    if (!productInCartButDifferentSize)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product]
      })

    // Acumular
    const updatedProducts = state.cart.map(p => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p

      // Actualizar la cantidad
      p.quantity += product.quantity
      return p
    })

    dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts
    })
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change cart quantity', payload: product })
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product })
  }

  const updateAddress = (address: TShippingAddress) => {
    Cookie.set('firstName', address.firstName)
    Cookie.set('lastName', address.lastName)
    Cookie.set('address', address.address)
    Cookie.set('address2', address.address2 || '')
    Cookie.set('zip', address.zip)
    Cookie.set('city', address.city)
    Cookie.set('country', address.country)
    Cookie.set('phone', address.phone)

    dispatch({ type: '[Cart] - Update Address', payload: address })
  }

  /**
   * Create's order Rest API
   * @alias /orders
   */
  const createOrder = async (): Promise<{
    hasError: boolean
    message: string
  }> => {
    try {
      const body: IOrder = {
        orderItems: state.cart.map(p => ({ ...p, size: p.size! })),
        shippingAddress: state.shippingAddress!,
        numberOfItems: state.numberOfItems,
        isPaid: false,
        total: state.total,
        subTotal: state.subTotal,
        tax: state.tax
      }

      const { data } = await tesloApi.post<IOrder>('/orders', body)

      dispatch({ type: '[Cart] - Order complete' })

      return { hasError: false, message: data._id! }
    } catch (error) {
      return {
        hasError: true,
        message: axios.isAxiosError(error)
          ? error.response?.data.message
          : 'Error no controlado'
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProductToCart,
        removeCartProduct,
        updateCartQuantity,
        updateAddress,

        // Orders
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
