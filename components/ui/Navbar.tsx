import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material'

import {
  Toolbar,
  Link,
  Typography,
  Box,
  AppBar,
  Button,
  IconButton,
  Badge,
  Input,
  InputAdornment
} from '@mui/material'
import { CartContext, UIContext } from '../../context'

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
  const { asPath, push } = useRouter()

  const { cart } = useContext(CartContext)

  const { toggleMenu } = useContext(UIContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    push(`/search/${searchTerm}`)
  }

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
          className="fadeIn"
          sx={{
            display: isSearchVisible
              ? 'none'
              : {
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

        {/* pantallas grandes */}
        {isSearchVisible ? (
          <Input
            sx={{
              display: {
                xs: 'none',
                sm: 'flex'
              }
            }}
            autoFocus
            className="fadeIn"
            type="text"
            placeholder="Buscar..."
            onChange={ev => setSearchTerm(ev.target.value)}
            onKeyPress={ev => (ev.key === 'Enter' ? onSearchTerm() : null)}
            value={searchTerm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsSearchVisible(false)}
                  aria-label="toggle password visibility"
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            className="fadeIn"
            sx={{
              display: {
                xs: 'none',
                sm: 'block'
              }
            }}
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* pantallas peques */}
        <IconButton
          onClick={toggleMenu}
          sx={{
            display: {
              xs: 'flex',
              sm: 'none'
            }
          }}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart">
          <Link>
            <IconButton>
              <Badge
                badgeContent={cart.length > 9 ? '+9' : cart.length}
                color="secondary"
              >
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
