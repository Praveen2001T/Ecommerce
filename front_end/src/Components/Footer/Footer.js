import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pinTester_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_logo">
        <img src={footer_logo} alt="Logo" height={70} width={70} />
        <p>SHOPPER</p>
      </div>
      <ul className="footer_links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer_socialIcons">
        <div className="footer_icon">
          <img src={instagram_icon} alt="Instagram" height={25} width={25} />
        </div>
        <div className="footer_icon">
          <img src={pinTester_icon} alt="PinTester" height={25} width={25} />
        </div>
        <div className="footer_icon">
          <img src={whatsapp_icon} alt="Whatsapp" height={25} width={25} />
        </div>
      </div>
      <div className="footer_copyright">
        <hr />
        <p>Copyright @ 2023 - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
