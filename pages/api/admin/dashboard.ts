import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import Order from '../../../models/Order'
import { Product, User } from '../../../models'

type Data = {
  numberOfOrders: number
  paidOrders: number // isPaid: true
  notPaidOrders: number
  numberOfClients: number // role: client
  numberOfProducts: number
  productsWithNoInventory: number // 0
  lowInventory: number // productos con 10 o menos
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect()

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory
  ] = await Promise.all([
    // Orders
    Order.count(),
    Order.find({ isPaid: true }).count(),

    // Clients
    User.find({ role: 'client' }).count(),

    // Products
    Product.count(),
    Product.find().where({ inStock: 0 }).count(),
    Product.find({
      inStock: {
        $lte: 10
      }
    }).count()
  ])

  const notPaidOrders = numberOfOrders - paidOrders

  await db.disconnect()

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory
  })
}
