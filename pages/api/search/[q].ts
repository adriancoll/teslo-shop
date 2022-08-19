import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProducts } from '../../../interfaces'
import { Product } from '../../../models'

type ProductData =
  | {
      message: string
    }
  | IProducts[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData>
) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res)

    default:
      return res.status(400).json({ message: 'No existe ese método.' })
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductData>
) => {
  let { q = '' } = req.query

  if (q.length === 0)
    return res.status(400).json({ message: 'La búsqueda no puede estar vacía' })

  q = q.toString().toLowerCase()

  await db.connect()

  const products = await Product.find({
    $text: { $search: q }
  })
    .select('title slug images inStock price -_id')
    .lean()

  await db.disconnect()

  return res.status(200).json(products)
}
