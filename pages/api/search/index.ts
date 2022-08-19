import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  return res.status(400).json({ name: 'Not found' })
}
