import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import AddProduct_icon from "../../assets/Product_Cart.svg";
import ListProduct_icon from "../../assets/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addProduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar_item">
          <img src={AddProduct_icon} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listProduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar_item">
          <img src={ListProduct_icon} alt="Product List" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
