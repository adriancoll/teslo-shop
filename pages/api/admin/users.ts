import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import { IUser } from '../../../interfaces'
import { isValidObjectId } from 'mongoose'

type Data = { message: string } | IUser[]

const validRoles = ['admin', 'client', 'SEO', 'super-user']

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res)
    case 'PUT':
      return updateUser(req, res)

    default:
      return res.status(200).json({ message: 'Example' })
  }
}

/**
 * @description Returns all users for the admin panel
 * @param req
 * @param res
 * @returns
 */
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()

  const users = await User.find().select('-password').lean()

  await db.disconnect()

  return res.status(200).json(users)
}

/**
 * @description Updates a user role
 * @param req
 * @param res
 * @returns
 */
const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body

  // Basic validations
  if (!isValidObjectId(userId))
    return res.status(400).json({ message: 'Invalid userId' })

  if ( !validRoles.includes(role) )
    return res.status(400).json({ message: `Rol no permitido: ${validRoles.join(', ')}` })

  // Database validations
  await db.connect()

  const user = await User.findById(userId)

  if (!user) return res.status(404).json({ message: `User not found: ${userId}` })

  user.role = role
  await user.save()

  await db.disconnect()

  return res.status(200).json({ message: 'Usuario actualizado'})
}
