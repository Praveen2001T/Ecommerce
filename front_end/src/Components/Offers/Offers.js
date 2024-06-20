import React from "react";
import "./Offers.css";
import ExclusiveImg from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers_left">
        <h1>
          Exclusive
          <br /> Offers For You
        </h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offers_right">
        <img src={ExclusiveImg} alt="Exclusive" height={400} width={280} />
      </div>
    </div>
  );
};

export default Offers;
