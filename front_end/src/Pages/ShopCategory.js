import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import DropdownIcon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { Grid } from "@mui/material";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
  const { All_products } = useContext(ShopContext);
  return (
    <div>
      <img className="shopCategory_banner" src={props.banner} alt="Banner" />
      <div className="shopCategory_indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopCategory_sort">
          Sort By <img src={DropdownIcon} alt="Dropdown" />
        </div>
      </div>
      <Grid container className="popular_item">
        {All_products.map((item, index) => {
          if (props.category === item.category) {
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
          } else {
            return null;
          }
        })}
      </Grid>
      <div className="shopCategory_loadMore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
