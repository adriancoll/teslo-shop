import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { ShopLayout } from "../../components/layouts";
import { ProductSizeSelector, SlideShow } from "../../components/products";
import { ProductItemCounter } from "../../components/ui";
import { initialData } from "../../database/products";

const product = initialData.products[0];

const slug = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* slideshow */}
          <SlideShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ProductItemCounter />
              <ProductSizeSelector
                selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            {/* Agregar al carrito */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

            {/* <Chip variant="outlined" color="error" label="No hay disponibles" /> */}

            {/* Descripcion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción:</Typography>
              <Typography variant="body2">{product.description} </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default slug;
