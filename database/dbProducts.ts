import { db } from '.'
import { IProducts, ProductSlug } from '../interfaces'
import { Product } from '../models'

export const getProductBySlug = async (
  slug: string
): Promise<IProducts | null> => {
  await db.connect()
  const product = await Product.findOne({ slug })
    .select('title price sizes images description -_id')
    .lean()
  await db.disconnect()

  if (!product) return null

  return JSON.parse(JSON.stringify(product))
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect()

  const slugs = await Product.find().select('slug -_id').lean()

  await db.disconnect()

  return JSON.parse(JSON.stringify(slugs))
}

export const getProductsByTerm = async (term: string): Promise<IProducts[]> => {
  await db.connect()

  const searchResults = await Product.find({
    $text: { $search: term }
  })
    .select('title price sizes images description -_id')
    .lean()

  await db.disconnect()

  return JSON.parse(JSON.stringify(searchResults))
}

export const getAllProducts = async (): Promise<IProducts[]> => {
  await db.connect()

  const products = await Product.find()
    .select('title price sizes images description -_id')
    .lean()

  await db.disconnect()

  return JSON.parse(JSON.stringify(products))
}
