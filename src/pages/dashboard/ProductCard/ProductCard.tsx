import Typography from "@mui/material/Typography";
import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import { actionIncreaseItem } from "src/redux/cart/cart.action";
import { useDispatch } from "react-redux";

interface ProductCardProps {
  name: string;
  id: string;
  imageURL: string;
}
export default function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch();

  const addToCart = useCallback(() => {
    dispatch(
      actionIncreaseItem({
        id: props.id,
        count: 1,
      })
    );
  }, [dispatch, props.id]);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        flex={1}
        sx={{
          backgroundImage: `url(${props.imageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          borderRadius: "10px",
        }}
      ></Box>
      <Typography component="p" variant="h6" align="center">
        {props.name}
      </Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
        onClick={() => addToCart()}
      >
        Add to cart
      </Button>
    </Paper>
  );
}
