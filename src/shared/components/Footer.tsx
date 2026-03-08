import React from "react";
import Navbar from "./partial/Navbar";
import SocialLinks from "./partial/SocialLinks";

function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <Navbar orientation="columns" />
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
