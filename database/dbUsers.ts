import bcrypt from 'bcryptjs'

import { db } from '.'
import { User } from '../models'
import { userAgent } from 'next/server'
import { ProviderType } from 'next-auth/providers'

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect()
  const user = await User.findOne({ email })
  await db.disconnect()

  if (!user) {
    return null
  }

  if (!bcrypt.compareSync(password, user.password)) return null

  const { role, name, _id, image } = user

  console.log({ user });

  return { role, name, _id, image: image || '' }
}

/**
 * Creates user by oauth providers
 * @param oAuthEmail
 */
export const createOAuthUser = async (
  oAuthEmail: string,
  oAuthName: string,
  provider = 'credentials',
  profileImage: string
) => {
  await db.connect()
  const userInDB = await User.findOne({ email: oAuthEmail })

  if (userInDB) {
    await db.disconnect()
    const { name, _id, email, image } = userInDB
    return { name, _id, email, image }
  }

  const newUser = new User({
    email: oAuthEmail,
    password: 'oauth-user',
    name: oAuthName,
    role: 'client',
    image: profileImage,
    provider
  })

  await newUser.save()
  await db.disconnect()

  const { name, _id, email, image } = newUser

  return { name, _id, email, image }
}
