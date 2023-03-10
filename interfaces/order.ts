import { TGenders, TSize } from './products'
import { IUser } from './user'

export interface IOrder {
  _id?              : string
  user?             : IUser | string
  orderItems        : IOrderItem[]
  shippingAddress   : TShippingAddress

  paymentResult?    : string
  numberOfItems     : number
  subTotal          : number
  tax               : number
  total             : number

  isPaid            : boolean
  paidAt          ? : string

  transactionId   ? : string
}

export interface IOrderItem {
  _id               : string
  title             : string
  image             : string
  size              : TSize
  gender            : TGenders
  slug              : string
  price             : number
  quantity          : number
}

export interface TShippingAddress {
  firstName         : string
  lastName          : string
  address           : string
  address2?         : string
  zip               : string
  city              : string
  country           : string
  phone             : string
}


// HISTORY

export type THistoryOrder = {
  id: number
  orderId: string
  paid: boolean
  fullname: string
}