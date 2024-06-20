import React from "react";
import "./ProductDetail.css";
import Arrow_icon from "../Assets/breadcrum_arrow.png";

const ProductDetail = (props) => {
  const { product } = props;
  return (
    <div className="productDetail">
      HOME <img src={Arrow_icon} alt="arrow" />
      SHOP
      <img src={Arrow_icon} alt="arrow" />
      {product.category}
      <img src={Arrow_icon} alt="arrow" />
      {product.name}
    </div>
  );
};

export default ProductDetail;
