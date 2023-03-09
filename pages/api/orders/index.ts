import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces'
import Order from '../../../models/Order'
import { getSession } from 'next-auth/react'
import { db } from '../../../database'
import { Product } from '../../../models'
import axios, { AxiosError } from 'axios'

type Data = { message: string } | IOrder

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder

  console.log('fake total:', total)

  // Check if user is logged in
  const session: any = await getSession({ req })

  if (!session) return res.status(401).json({ message: 'Bad session' })

  const productIds = orderItems.map(p => p._id)

  await db.connect()

  // Find all products from the orderItems
  const dbProducts = await Product.find({ _id: { $in: productIds } })

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        prod => prod.id === current._id
      )?.price

      if (!currentPrice) {
        console.log({ currentPrice })

        throw new Error('Verifique el carrito de nuevo, el producto no existe.')
      }

      return currentPrice * current.quantity + prev
    }, 0)

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    /** @type {Number} Reduced product prices + Tax */
    const backendTotal = subTotal * (taxRate + 1)

    if (backendTotal !== total)
      throw new Error('El total no está bien generado.')

    const userId = session.user._id

    const numberOfItems = orderItems.reduce(
      (prev, current) => prev + current.quantity,
      0
    )

    const newOrder = new Order({
      ...req.body,
      subTotal,
      numberOfItems,
      tax: total * taxRate,
      total: backendTotal,
      isPaid: false,
      user: userId
    })
    newOrder.total = Math.round( newOrder.total * 100 ) / 100

    await newOrder.save()

    await db.disconnect()

    return res.status(201).json(newOrder)
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}
