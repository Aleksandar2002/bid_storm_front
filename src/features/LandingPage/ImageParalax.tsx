import React from "react";
import Button from "../../shared/components/global/Button";
import { useNavigate } from "react-router";

const ImageParalax = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page-image-section">
      <div className="image"></div>
      <div className="layer"></div>
      <div className="content rounded shadow-dark flexcol">
        <h1 className="font-14 bold">BID MARKET</h1>
        <h2>Your next win is just a few steps away</h2>
        <h4>New day, new oportunity</h4>
        <Button
          btnClass="font-7 long-padding mt-2"
          handleClickFunction={() => navigate("/login")}
          text="Join us"
        />
      </div>
    </div>
  );
};

export default ImageParalax;
