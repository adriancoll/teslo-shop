import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

import {
  Toolbar,
  Link,
  Typography,
  Box,
  AppBar,
  Button,
  IconButton,
  Badge
} from '@mui/material'
import { useContext } from 'react'
import { UIContext } from '../../context/ui'

const navRoutes = [
  {
    slug: '/category/men',
    label: 'Hombres'
  },
  {
    slug: '/category/women',
    label: 'Mujeres'
  },
  {
    slug: '/category/kids',
    label: 'Niños'
  }
]

export const Navbar = () => {
  const { asPath } = useRouter()

  const { toggleMenu } = useContext(UIContext)

  return (
    <AppBar>
      <Toolbar>
        <NextLink passHref href="/">
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box sx={{ flex: 1 }} />

        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'block'
            }
          }}
        >
          {navRoutes.map(({ slug, label }) => (
            <NextLink key={slug} passHref href={slug}>
              <Link>
                <Button color={asPath === slug ? 'primary' : 'info'}>
                  {label}
                </Button>
              </Link>
            </NextLink>
          ))}
        </Box>

        <Box sx={{ flex: 1 }} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="cart">
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
