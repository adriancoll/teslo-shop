import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { db } from '../../../database'
import { ISuccessAuthResponse } from '../../../interfaces'
import { User } from '../../../models'

import { jwt, validations } from '../../../utils'

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
      registerUser(req, res)
      break

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = ''
  } = req.body as { email: string; name: string; password: string }

  await db.connect()
  const userFound = await User.findOne({ email }).lean()

  if (userFound) {
    await db.disconnect()
    return res.status(400).json({ message: 'Correo ya registrado' })
  }

  if (password.length < 6)
    return res
      .status(400)
      .json({ message: 'La contraseña debe tener más de 6 carácteres' })

  if (name.length < 3)
    return res
      .status(400)
      .json({ message: 'La nombre debe tener más de 2 carácteres' })

  // todo validar email
  if (!validations.isValidEmail(email))
    return res
      .status(400)
      .json({ message: 'El formato del email no es válido' })

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name
  })

  try {
    await newUser.save({ validateBeforeSave: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Revisar logs del servidor' })
  }

  const { _id, role } = newUser

  const token = jwt.signToken(_id, email)

  return res.status(200).json({ token, user: { role, name, email } })
}
