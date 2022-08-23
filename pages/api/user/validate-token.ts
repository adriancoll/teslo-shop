import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { db } from '../../../database'
import { UserRoles } from '../../../interfaces'

import { jwt } from '../../../utils'
import { User } from '../../../models'

type Data =
  | {
      message: string
    }
  | {
      token: string
    }
  | {
      token: string
      user: {
        email: string
        name: string
        role: UserRoles
      }
    }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      validateToken(req, res)
      break

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const validateToken = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { token = '' } = req.cookies

  if (!token)
    return res.status(400).json({ message: 'No se ha encontrado ningún token' })

  let userId = ''

  try {
    userId = await jwt.isVaidToken(token)
  } catch (err) {
    return res.status(400).json({ message: 'El token no es válido' })
  }

  await db.connect()
  const userFound = await User.findById(userId).lean()
  await db.disconnect()

  if (!userFound)
    return res.status(400).json({ message: 'El usuario no existe' })

  const { _id, email, name, role   } = userFound

  const newToken = jwt.signToken(_id, email)

  return res.status(200).json({ token: newToken, user: { role, name, email } })
}
