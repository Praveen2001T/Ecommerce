import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import RemoveIcon from "../Assets/cart_cross_icon.png";
import "./CartItems.css";
import { Grid } from "@mui/material";

const CartItems = () => {
  const { All_products, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  return (
    <div className='cartItems'>
      <Grid item={12} container spacing={3} className='format_main'>
        <Grid item xs={1} className='format_heading'>
          <p>Products</p>
        </Grid>
        <Grid item xs={3.5} className='format_heading'>
          <p>Title</p>
        </Grid>
        <Grid item xs={2} className='format_heading'>
          <p>Price</p>
        </Grid>
        <Grid item xs={2} className='format_heading'>
          <p>Quantity</p>
        </Grid>
        <Grid item xs={2} className='format_heading'>
          <p>Total</p>
        </Grid>
        <Grid item xs={1} className='format_heading'>
          <p>Remove</p>
        </Grid>
      </Grid>
      <hr />
      {All_products?.filter((item) => cartItems[item.id] > 0).map((item) => {
        return (
          <div>
            <Grid item={12} container spacing={3} className='format_main'>
              <Grid item xs={1} className='format_content'>
                <img src={item?.image} alt='Item' className='cart_image' />
              </Grid>
              <Grid item xs={3.5} className='format_content'>
                <p>{item?.name}</p>
              </Grid>
              <Grid item xs={2} className='format_content'>
                <p>${item?.new_price}</p>
              </Grid>
              <Grid item xs={2} className='format_content'>
                <button className='quantity_btn'>{cartItems[item.id]}</button>
              </Grid>
              <Grid item xs={2} className='format_content'>
                <p>${item?.new_price * cartItems[item.id]}</p>
              </Grid>
              <Grid item xs={1} className='format_content'>
                <img
                  src={RemoveIcon}
                  alt='Remove'
                  onClick={() => removeFromCart(item.id)}
                  className='remove_icon'
                />
              </Grid>
            </Grid>
            <hr />
          </div>
        );
      })}
      <div className='cartItems_down'>
        <div className='cartItems_total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cartItems_total_Item'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cartItems_total_Item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className='cartItems_total_Item'>
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cartItems_promoCode'>
          <p>If you have promo code, Enter it here</p>
          <div className='cartItems_promoBox'>
            <input type='text' placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
