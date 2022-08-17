import NextLink from "next/link";

import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

import {
  Toolbar,
  Link,
  Typography,
  Box,
  AppBar,
  Button,
  IconButton,
  Badge,
} from "@mui/material";

export const Navbar = () => {
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
              xs: "none",
              sm: "block",
            },
          }}
        >
          <NextLink passHref href={"/category/men"}>
            <Link>
              <Button>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink passHref href={"/category/women"}>
            <Link>
              <Button>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink passHref href={"/category/kids"}>
            <Link>
              <Button>Niños</Button>
            </Link>
          </NextLink>
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

        <Button>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
