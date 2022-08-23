import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { db } from '../../../database'
import { ISuccessAuthResponse } from '../../../interfaces'
import { User } from '../../../models'

import { jwt } from '../../../utils'

type Data =
  | {
      message: string
    }
  | ISuccessAuthResponse

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      loginUser(req, res)
      break

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body

  await db.connect()
  const userFound = await User.findOne({ email }).lean()
  await db.disconnect()

  if (!userFound)
    return res
      .status(400)
      .json({ message: 'Correo o contraseña no válidos - EMAIL' })

  if (!bcrypt.compareSync(password, userFound.password!))
    return res
      .status(400)
      .json({ message: 'Correo o contraseña no válidos - PASSWORD' })

  const { role, name, _id } = userFound

  const token = jwt.signToken(_id, email)

  return res.status(200).json({ token, user: { role, name, email } })
}
