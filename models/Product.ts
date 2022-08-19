import mongoose, { model, Model, Schema } from 'mongoose'
import { IProducts } from '../interfaces'
import products from '../pages/api/products'

const productSchema = new Schema(
  {
    description: { type: String, requried: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, requried: true, default: 0 },
    sizes: [
      {
        type: String,
        requried: true,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          message: '{VALUE} no es una talla permitida.'
        }
      }
    ],
    slug: { type: String, requried: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, requried: true },
    type: {
      type: String,
      requried: true,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} no es un tipo válido.'
      }
    },
    gender: {
      type: String,
      requried: true,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} no es un género válido'
      }
    }
  },
  {
    timestamps: true
  }
)

// TODO: Crear indice de Mongo

productSchema.index({ title: 'text', tags: 'text' })

const Product: Model<IProducts> =
  mongoose.models.Product || model('Product', productSchema)

export default Product
