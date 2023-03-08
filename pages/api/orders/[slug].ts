import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces/products'
import Order from '../../../models/Order'

type Data = { message: string } | IProduct[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getOrder(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const getOrder = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // const dbOrder = Order.findById()
  return res.status(201).json({ message: 'hola' })
}
