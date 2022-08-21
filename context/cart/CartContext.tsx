import { createContext } from 'react'
import { ICartProduct } from '../../interfaces'

export interface CartContextProps {
    cart: ICartProduct[]

    // methods
    addProductToCart: (payload: ICartProduct) => void
}

export const CartContext = createContext({} as CartContextProps)
