import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import { IProducts } from '../../../interfaces'
import { Product } from '../../../models'

type ProductData = { product: IProducts } | { message: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData>
) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res)
    default:
      return res.status(400).json({ message: 'Método no encontrado' })
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductData>
) => {
  const { slug } = req.query as { slug: string }

  await db.connect()

  const product: IProducts = await Product.findOne({ slug: slug.trim() }).lean()

  await db.disconnect()

  if (!product)
    return res.status(404).json({ message: 'Producto no encontrado' })

  res.status(200).json({ product })
}
