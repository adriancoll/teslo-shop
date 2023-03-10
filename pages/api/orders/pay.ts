import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IPaypal } from '../../../interfaces'
import { db } from '../../../database'
import Order from '../../../models/Order'
import { isValidObjectId } from 'mongoose'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res)
    default:
      res.status(404)
  }
}

/**
 * @see paypal docs
 */
const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET!

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64')

  const body = new URLSearchParams('grant_type=client_credentials')

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    return data.access_token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data)
      return null
    }

    console.log({ error })
  }
  return null
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const paypalBearerToken = await getPaypalBearerToken()

  if (!paypalBearerToken)
    return res
      .status(400)
      .json({ message: 'No se pudo confirmar el token de paypal...' })

  const { transactionId = '', orderId = '' } = req.body

  // Database: Order validations

  // Validate MongoId
  if (!isValidObjectId(orderId))
    return res.status(400).json({ message: 'ID No válido!' })

  await db.connect()
  const dbOrder = await Order.findById(orderId)

  if (!dbOrder) {
    await db.disconnect()
    return res.json({ message: 'Orden no existe en nuestra base de datos.' })
  }

  if (dbOrder.isPaid) {
    await db.disconnect()
    return res.json({ message: 'La orden ya fué pagada!' })
  }

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`
      }
    }
  )

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Orden no reconocida' })
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect()
    return res.json({
      message: 'Los precios de PayPal y nuestra base de datos no coinciden!!!!'
    })
  }

  // At this point everything is good
  dbOrder.transactionId = data.id
  dbOrder.isPaid = true
  dbOrder.paidAt = new Date().toString()

  await dbOrder.save()
  await db.disconnect()

  return res.status(200).json({ message: 'Orden pagada correctamente!' })
}
