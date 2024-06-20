import React from "react";
import "./RelatedProducts.css";
import { Grid } from "@mui/material";
import Item from "../Item/Item";
import data_product from "../Assets/data";

const RelatedProducts = () => {
  return (
    <div className="relatedProducts">
      <h1>Related Products</h1>
      <hr />
      <Grid container className="relatedProducts_item">
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

export default RelatedProducts;
