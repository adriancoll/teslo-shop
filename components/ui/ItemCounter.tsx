import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";

interface Props {
  min?: number;
  max?: number;
}

export const ProductItemCounter: FC<any> = ({ min = 0, max = 1 }) => {
  const [itemCount, setItemCount] = useState(0);

  const add = () =>
    setItemCount((last) => {
      if (max < 0) return last + 1;

      return Math.min(last + 1, max);
    });
    
  const substract = () => setItemCount((last) => Math.max(last - 1, min));

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={substract}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {itemCount}
      </Typography>
      <IconButton onClick={add}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
