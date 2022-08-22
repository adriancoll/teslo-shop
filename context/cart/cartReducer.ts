import { ICartProduct } from '../../interfaces'
import { CartState } from './'

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
      type: 'Cart - remove product by id'
      payload: ICartProduct
    }

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case 'Cart - Load cart from cookies | storage':
      return { ...state, cart: action.payload }
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
    case 'Cart - remove product by id':
      console.log(
        'remove',
        state.cart.findIndex(
          oldProduct =>
            oldProduct._id === action.payload._id &&
            oldProduct.size === action.payload.size
        )
      )
      return {
        ...state,
        cart: state.cart.splice(
          state.cart.findIndex(
            oldProduct =>
              oldProduct._id === action.payload._id &&
              oldProduct.size === action.payload.size
          ),
          1
        )
      }
    default:
      return state
  }
}
