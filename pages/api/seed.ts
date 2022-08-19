import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product } from '../../models'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    res.json({ message: 'No tiene acceso a este API.' })
  }

  try {
    await db.connect()
    await Product.deleteMany()
    await Product.insertMany(seedDatabase.initialData.products)
    await db.disconnect()
  } catch (err) {
    await db.disconnect()
    return res.status(400).json({ message: 'Ha habido un error.' })
  }

  res.status(200).json({ message: 'Creado corrctamente.' })
}
