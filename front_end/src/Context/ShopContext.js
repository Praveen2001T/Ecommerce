import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { createContext } from "react";
// import All_products from "../Components/Assets/all_product";
import { useState } from "react";

export const ShopContext = createContext(null);

const getCart = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [All_products, setAll_Products] = useState([]);
  const [cartItems, setCartItems] = useState(getCart());
  const [itemCount, setItemCount] = useState(0);
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (cartItems[itemId] === 0) {
      setItemCount(itemCount + 1);
    }
    if (localStorage.getItem("auth-token")) {
      const cart = {
        authToken: `${localStorage.getItem("auth-token")}`,
        itemId: itemId,
      };
      try {
        const response = await axios.post(
          "http://localhost:4000/addToCart",
          cart
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (cartItems[itemId] === 1) {
      setItemCount(itemCount - 1);
    }
    if (localStorage.getItem("auth-token")) {
      const cart = {
        authToken: `${localStorage.getItem("auth-token")}`,
        itemId: itemId,
      };
      try {
        const response = await axios.post(
          "http://localhost:4000/removeCart",
          cart
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = All_products?.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo?.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allproducts");
        console.log(response);
        setAll_Products(response?.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCartData = async () => {
      const cart = {
        authToken: `${localStorage.getItem("auth-token")}`,
      };
      try {
        const response = await axios.post(
          "http://localhost:4000/getCart",
          cart
        );
        console.log(response);
        setCartItems(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
    if (localStorage.getItem("auth-token")) {
      fetchCartData();
    }
  }, []);

  useEffect(() => {
    const count = Object.values(cartItems).filter((val) => val !== 0).length;
    setItemCount(count);
  }, [cartItems]);

  const contextValue = {
    All_products,
    cartItems,
    addToCart,
    removeFromCart,
    itemCount,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
