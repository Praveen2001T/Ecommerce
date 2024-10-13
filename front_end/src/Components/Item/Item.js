import React from "react";
import "./Item.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <Grid item xs={3} className='item'>
      <Link to={`/product/${props.id}`}>
        <img
          onClick={(e) => {
            window.scroll(0, 0);
          }}
          src={props.image}
          alt='Item'
          height={240}
          width={200}
        />
      </Link>

      <p>{props.name}</p>
      <div className='item_prices'>
        <div className='item_price_new'>${props.new_price}</div>
        <div className='item_price_old'>${props.old_price}</div>
      </div>
    </Grid>
  );
};

export default Item;
