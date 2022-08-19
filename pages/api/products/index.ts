import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { IProducts } from '../../../interfaces'
import { Product } from '../../../models'

type ProductsData = IProducts[] | { message: string }

export default function (
  req: NextApiRequest,
  res: NextApiResponse<ProductsData>
) {
  switch (req.method) {
    case 'GET':
      return getAllProducts(req, res)

    default:
      return res.json({ message: 'Método no encontrado' })
  }
}

const getAllProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductsData>
) => {
  const { gender = 'all' } = req.query

  let condition = {}

  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = { gender }
  }

  await db.connect()
  const products = await Product.find(condition)
    .select('title images price inStock slug -_id')
    .lean()

  await db.disconnect()
  return res.status(200).json(products)
}
