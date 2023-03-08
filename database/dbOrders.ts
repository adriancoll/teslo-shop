import { isValidObjectId } from 'mongoose'
import { IOrder } from '../interfaces'
import { db } from '.'
import Order from '../models/Order'

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null

  await db.connect()

  const orderDb = await Order.findById(id).lean()
  await db.disconnect()

  if (!orderDb) return null

  return JSON.parse(JSON.stringify(orderDb))
}

export const getOrdersByUser = async (
  userId: string
): Promise<IOrder[] | null> => {
  if (!isValidObjectId(userId)) return []

  await db.connect()
  const dbOrders = await Order.find({ user: userId }).lean()
  await db.disconnect()

  return JSON.parse(JSON.stringify(dbOrders))
}
