import React from "react";
import { createContext } from "react";
import All_products from "../Components/Assets/all_product";
import { useState } from "react";

export const ShopContext = createContext(null);

const getCart = () => {
  let cart = {};
  for (let index = 0; index < All_products.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getCart());
  const [itemCount, setItemCount] = useState(0);
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (cartItems[itemId] === 0) {
      setItemCount(itemCount + 1);
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (cartItems[itemId] === 1) {
      setItemCount(itemCount - 1);
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = All_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

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
