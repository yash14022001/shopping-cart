import { Grid } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { actionIncreaseItem } from "src/redux/cart/cart.action";
import ProductCard from "./ProductCard/ProductCard";
import { products } from "./data/products";

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      {products.map((p) => {
        return (
          <Grid
            item
            key={p.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              aspectRatio: "0.9",
            }}
          >
            <ProductCard imageURL={p.imageURL} name={p.name} id={p.id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Dashboard;
