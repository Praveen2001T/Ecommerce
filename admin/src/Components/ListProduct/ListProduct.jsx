import React from "react";
import "./ListProduct.css";
import { useEffect } from "react";
import { useState } from "react";
import CrossIcon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    await fetch("http://localhost:4000/allProducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = async (id) => {
    await fetch("http://localhost:4000/removeProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchProducts();
  };
  return (
    <div className="list_product">
      <h1>All Product List</h1>
      <div className="listProduct_format">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="line">
        <hr />
      </div>
      {allProducts.length <= 0 ? (
        <h3 className="noProduct">No Product is Added!!</h3>
      ) : (
        <div className="allProducts">
          {allProducts?.map((product, index) => {
            return (
              <>
                <div key={index} className="listProduct_format">
                  <img
                    src={product?.image}
                    alt="product"
                    className="product_image"
                  />
                  <p>{product?.name}</p>
                  <p>${product?.old_price}</p>
                  <p>${product?.new_price}</p>
                  <p>{product?.category}</p>
                  <img
                    src={CrossIcon}
                    alt="Remove"
                    className="remove_icon"
                    onClick={() => {
                      handleRemove(product?.id);
                    }}
                  />
                </div>
                <hr />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListProduct;
