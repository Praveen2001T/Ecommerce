import React from "react";
import "./Hero.css";
import HandImg from "../Assets/hand_icon.png";
import LadyImg from "../Assets/hero_image.png";
import ArrowIcon from "../Assets/arrow.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero_left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero_hand">
            <p>new</p>
            <img src={HandImg} alt="Hand" />
          </div>
          <p>
            collections
            <br /> for everyone
          </p>
        </div>
        <div className="latestBtn">
          <div>Latest Collection</div>
          <img src={ArrowIcon} alt="Arrow" />
        </div>
      </div>
      <div className="hero_right">
        <img src={LadyImg} alt="Lady" />
      </div>
    </div>
  );
};

export default Hero;
