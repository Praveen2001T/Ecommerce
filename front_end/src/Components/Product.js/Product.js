import React from "react";
// import data_product from "../Assets/data";
import Item from "../Item/Item";
import "./Product.css";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [data_product, setData_product] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await axios.get("http://localhost:4000/popularInWomen");
        console.log(response);
        setData_product(response.data);
        if (response && typeof response.destroy === "function") {
          response.destroy();
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <Grid container className='popular_item'>
        {data_product?.map((item, index) => {
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
