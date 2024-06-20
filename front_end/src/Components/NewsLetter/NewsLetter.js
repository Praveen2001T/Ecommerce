import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div className="mailContent">
        <input
          type="email"
          placeholder="Your Email id"
          className="newLetter_input"
        />
        <button className="input_button">Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
