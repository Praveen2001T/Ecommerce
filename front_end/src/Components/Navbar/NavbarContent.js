import React from "react";
import "./Navbar.css";
import Logo from "../Assets/logo.png";
import ShoppingCart from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const NavbarContent = () => {
  const { itemCount } = useContext(ShopContext);
  return (
    <div className='navbar'>
      <div className='nav_logo'>
        <img src={Logo} alt='Shopping-Logo' height={60} width={60} />
        <p>Glamour</p>
      </div>
      <ul className='nav_menu'>
        <li>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            Shop
          </Link>
        </li>
        <li>
          <Link to={"/men"} style={{ textDecoration: "none" }}>
            Men
          </Link>
        </li>
        <li>
          <Link to={"/women"} style={{ textDecoration: "none" }}>
            Women
          </Link>
        </li>
        <li>
          <Link to={"/kids"} style={{ textDecoration: "none" }}>
            Kids
          </Link>
        </li>
      </ul>
      <div className='nav_login'>
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        )}
        <Link to={"/cart"}>
          <img src={ShoppingCart} alt='Shopping-Cart' height={30} width={30} />
        </Link>
        <div className='cart_count'>{itemCount}</div>
      </div>
    </div>
  );
};

export default NavbarContent;
