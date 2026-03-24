import React from "react";
import Navbar from "../partial/Navbar";
import SocialLinks from "../partial/SocialLinks";
import Logo from "../partial/Logo";

function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <div>
          <Logo />
          <Navbar orientation="columns" />
        </div>
        <div className="contact-footer">
          <h3>Contact</h3>
          <p>Email:</p>
          <h4>kovacevicaleksandar2002@gmail.com</h4>
          <p>Phone number</p>
          <h4>+381637156236</h4>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
