import { FC } from 'react'

import { BuiltInProviderType } from 'next-auth/providers'
import { LiteralUnion } from 'next-auth/react'

import GoogleIcon from '@mui/icons-material/Google'
import GithubIcon from '@mui/icons-material/Github'

interface Props {
  provider: LiteralUnion<BuiltInProviderType>
}

export const ProviderIcon: FC<Props> = ({ provider }) => {
  if (provider === 'github') return <GithubIcon />
  if (provider === 'google') return <GoogleIcon />

  return <span>No provider registerd at ProviderIcon.tsx</span>
}
