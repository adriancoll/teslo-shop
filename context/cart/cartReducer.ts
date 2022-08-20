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

export const CartReducer = (
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
    default:
      return state
  }
}
