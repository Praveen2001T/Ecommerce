import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import ProductDetail from "../Components/ProductDetail/ProductDetail";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import Description from "../Components/Description/Description";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { All_products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = All_products.find((e) => e.id === Number(productId));
  return (
    <div>
      <ProductDetail product={product} />
      <ProductDisplay product={product} />
      <Description />
      <RelatedProducts />
    </div>
  );
};

export default Product;
