import React from "react";
import type { Auction } from "../../types/Auction";
import { useNavigate } from "react-router";
import SingleImage from "../../shared/components/media/SingleImage";
import Tooltip from "../../shared/components/partial/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../shared/utils/dateHelper";
import Button from "../../shared/components/global/Button";
import AddToWishlist from "../Auctions/AddToWishlist";

type AuctionListItemProp = {
  auction: Auction;
  isMyAuction?: boolean;
};

const AuctionListItem = ({ auction, isMyAuction }: AuctionListItemProp) => {
  const navigate = useNavigate();

  const { product } = auction;

  const handleOpenDetails = () => {
    navigate(`/auctions/${auction.id}`);
  };

  return (
    <tr className="auction-card">
      <td>
        <div className="card-image-div pointer">
          <Tooltip
            title={
              <div className="flexbox">
                <FontAwesomeIcon className="mr-1" icon={"gavel"} />
                <p className="font-4 mr-5">{auction.auctionBidsCount}</p>
                <FontAwesomeIcon className="mr-1" icon={"eye"} />
                <p className="font-4">{auction.auctionSeenCount}</p>
              </div>
            }
            bottomSpacing="70px"
          >
            <div className="pointer image" onClick={handleOpenDetails}>
              <SingleImage
                width="120px"
                image={{
                  src: product.mainImage?.src,
                  alt: product.mainImage?.alt,
                }}
              />
            </div>
          </Tooltip>
        </div>
      </td>
      <td>
        <div className="mt-2 pointer" onClick={handleOpenDetails}>
          <h4 className="bold font-4  capitalize mr-2">{product.title}</h4>
        </div>
      </td>
      <td>
        <div className="flexcol align-start">
          <p>
            Starting:
            <span className="bold font-5 ml-1 font-light">
              ${auction.startingPrice}
            </span>
          </p>
          <p>
            Current:
            <span className="bold font-5 ml-1 font-light">
              ${auction.currentPrice}
            </span>
          </p>
        </div>
      </td>
      <td>
        <div className="flexcol align-start">
          {auction.buyoutPrice && (
            <>
              <p>
                Buyout:
                <span className="bold font-5 ml-1 font-light">
                  ${auction.buyoutPrice}
                </span>
              </p>
            </>
          )}
          {product.seller && <p>{product.seller.placeName}</p>}
        </div>
      </td>
      <td>
        {" "}
        <div className="flexbox mt-2">
          <p>Ends at: {formatDate(auction.endsAt, "long")}</p>
        </div>
      </td>
      <td>
        <div className="flexbox justify-center">
          <Button
            btnClass="auction-card-button light mr-1"
            text="Open details"
            handleClickFunction={handleOpenDetails}
          />
          {!isMyAuction && <AddToWishlist auctionId={auction.id} />}
        </div>
      </td>
    </tr>
  );
};
export default AuctionListItem;
