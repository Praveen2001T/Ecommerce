import React, { useContext } from "react";
import "./ProductDisplay.css";
import Star_icon from "../Assets/star_icon.png";
import StarDull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className='productDisplay'>
      <div className='product_left'>
        <div className='product_img_list'>
          <img src={product.image} alt='product' />
          <img src={product.image} alt='product' />
          <img src={product.image} alt='product' />
          <img src={product.image} alt='product' />
        </div>
        <div className='product_img'>
          <img className='product_img_main' src={product.image} alt='product' />
        </div>
      </div>
      <div className='product_right'>
        <h1>{product.name}</h1>
        <div className='product_right_star'>
          <img src={Star_icon} alt='Star' />
          <img src={Star_icon} alt='Star' />
          <img src={Star_icon} alt='Star' />
          <img src={Star_icon} alt='Star' />
          <img src={StarDull_icon} alt='StarDull' />
          <p>(126)</p>
        </div>
        <div className='product_right_prices'>
          <div className='product_price_old'>${product.new_price}</div>
          <div className='product_price_new'>${product.old_price}</div>
        </div>
        <div className='product_right_description'>
          <p>
            As the trends are constantly changing every couple of years, it
            could be a bit less budget-friendly to stick to this way of dressing
            than sticking to the elegant basics.
          </p>
        </div>
        <div className='product_right_size'>
          <h1>Select Size</h1>
          <div className='product-right-size'>
            <div>
              <p>S</p>
            </div>
            <div>
              <p>M</p>
            </div>
            <div>
              <p>L</p>
            </div>
            <div>
              <p>XL</p>
            </div>
            <div>
              <p>XLL</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            if (localStorage.getItem("auth-token")) {
              addToCart(product.id);
            } else {
              alert("Please login to proceed further");
              window.location.replace("/login");
            }
          }}
        >
          ADD TO CART
        </button>
        <p className='product_category'>
          <span>Category :</span>Women , T-Shirt, Crop Top
        </p>
        <p className='product_category'>
          <span>Tags :</span>Modern , Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
