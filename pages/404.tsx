import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";

// pages/404.tsx
export default function Custom404() {
  return (
    <ShopLayout
      title="Página no encontrada"
      pageDescription="No hay nada que mostrar aquí"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Typography variant="h1" component="h1" fontSize={100} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>No hemos encontrado nada!</Typography>
      </Box>
    </ShopLayout>
  );
}
