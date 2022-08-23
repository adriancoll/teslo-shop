import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED)
    throw new Error("JWT seed isn't provided in .env file!")

  return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED as string, {
    expiresIn: '30d'
  })
}

export const isVaidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED)
    throw new Error("JWT seed isn't provided in .env file!")

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT no es válido')

        const { _id } = payload as { _id: string }
        
        resolve(_id)
      })
    } catch (err) {
      reject('JWT no es válido')
    }
  })
}
