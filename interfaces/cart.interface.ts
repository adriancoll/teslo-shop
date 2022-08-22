import { ISize, IType } from "./products.interface"

export interface ICartProduct {
  _id: string
  title: string
  image: string
  price: number 
  size?: ISize
  slug: string
  type: IType
  gender: 'men' | 'women' | 'kid' | 'unisex'
  quantity: number
}
