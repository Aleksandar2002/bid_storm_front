import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="how-it-works shadow-dark">
      <h2 className="font-12 bold">How it works</h2>
      <hr className="line" />
      <div className="wrapper flexbox">
        <div className="flexcol col rounded shadow-dark">
          <div className="icon-div">
            <FontAwesomeIcon icon={"magnifying-glass"} />
          </div>
          <h3 className="mt-4 mb-2">Discover</h3>
          <p className="font-5">
            Browse through our active auctions and find your perfect items.
          </p>
        </div>
        <div className="flexcol col rounded shadow-dark">
          <div className="icon-div">
            <FontAwesomeIcon icon={"gavel"} />
          </div>
          <h3 className="mt-4 mb-2">Bid</h3>
          <p className="font-5">
            Place your bid instantly and track the live price changes.
          </p>
        </div>

        <div className="flexcol col rounded shadow-dark">
          <div className="icon-div">
            <FontAwesomeIcon icon={"crown"} />
          </div>
          <h3 className="mt-4 mb-2">Win</h3>
          <p className="font-5">
            Become the highest bidder and securely pay for your item.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
