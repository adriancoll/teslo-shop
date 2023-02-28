import mongoose, { Schema, model, Model } from 'mongoose'
import { IUser } from '../interfaces'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    role: {
      type: String,
      enum: {
        values: ['admin', 'client'],
        message: '{VALUE} no es un rol válido.',
        default: 'client',
        required: true
      }
    },
    provider: {
      type: String,
      required: false,
      default: 'credentials'
    }
  },
  {
    timestamps: true
  }
)

const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User
