import React from "react";
import data_product from "../Assets/data";
import Item from "../Item/Item";
import "./Product.css";
import { Grid } from "@mui/material";

const Product = () => {
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <Grid container className="popular_item">
        {data_product.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.new_price}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default Product;
