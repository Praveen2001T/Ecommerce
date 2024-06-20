import React from "react";
import "./Description.css";

const Description = () => {
  return (
    <div className="description">
      <div className="description_nav">
        <div className="description_nav_box">Description</div>
        <div className="description_nav_box fade">Reviews (135)</div>
      </div>
      <div className="description_box">
        <p>
          An ecommerce website is your digital storefront on the internet. It
          facilitates the transaction between a buyer and seller. It is the
          virtual space where you showcase products, and online customers make
          selections. Your website acts as the product shelves, sales staff, and
          cash register of your online business channel.
        </p>
        <p>
          The standard definition of E-commerce is a commercial transaction
          which is happened over the internet. Online stores like Amazon,
          Flipkart, Shopify, Myntra, Ebay, Quikr, Olx are examples of E-commerce
          websites.
        </p>
      </div>
    </div>
  );
};

export default Description;
