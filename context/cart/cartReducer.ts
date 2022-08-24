import { ICartProduct, OrderSummary } from '../../interfaces'

import { ShippingAddress, CartState } from './'

type CartActionType =
  | {
      type: 'Cart - Load cart from cookies | storage'
      payload: ICartProduct[]
    }
  | {
      type: 'Cart - Add product'
      payload: ICartProduct
    }
  | {
      type: 'Cart - Update product'
      payload: ICartProduct
    }
  | {
      type: 'Cart - remove product'
      payload: ICartProduct
    }
  | {
      type: 'Cart - Update order summary'
      payload: OrderSummary
    }
  | {
      type: 'Cart - Load address from cookies | storage'
      payload: ShippingAddress
    }
  | {
      type: 'Cart - Update Address'
      payload: ShippingAddress
    }

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case 'Cart - Load cart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload]
      }

    case 'Cart - Add product':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }

    case 'Cart - Update product':
      return {
        ...state,
        // Map the cart and if the product is the same that we get from
        // payload replace it on the same position
        cart: state.cart.map(oldProduct =>
          oldProduct._id === action.payload._id &&
          oldProduct.size === action.payload.size
            ? action.payload
            : oldProduct
        )
      }

    case 'Cart - remove product':
      return {
        ...state,
        cart: state.cart.filter(
          old =>
            old._id != action.payload._id && old.size != action.payload.size
        )
      }

    case 'Cart - Update order summary':
      return {
        ...state,
        ...action.payload
      }

    case 'Cart - Load address from cookies | storage':
    case 'Cart - Update Address':
      return {
        ...state,
        shippingAddress: action.payload
      }
      
    default:
      return state
  }
}
