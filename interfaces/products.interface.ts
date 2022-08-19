import { BaseEntity } from './entity.interface'

export type ISize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type IType = 'shirts' | 'pants' | 'hoodies' | 'hats'

export interface IProducts extends BaseEntity {
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ISize[]
  slug: string
  tags: string[]
  title: string
  type: IType
  gender: 'men' | 'women' | 'kid' | 'unisex'
}

export interface ProductSlug {
  slug: string
}