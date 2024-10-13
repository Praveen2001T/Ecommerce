import React from "react";
import "./NewCollections.css";
// import data_collections from "../Assets/new_collections";
import Item from "../Item/Item";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const NewCollections = () => {
  const [data_collections, setData_collections] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await axios.get("http://localhost:4000/newCollections");
        console.log(response);
        setData_collections(response.data);
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
    <div className='new_collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <Grid container className='collection_item'>
        {data_collections.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default NewCollections;
