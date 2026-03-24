import { useNavigate } from "react-router";
import Button from "../../shared/components/global/Button";
import SingleImage from "../../shared/components/media/SingleImage";
import type { Auction } from "../../types/Auction";
import Tooltip from "../../shared/components/partial/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../shared/utils/dateHelper";
import AddToWishlist from "../Auctions/AddToWishlist";
// import Image from "../../shared/components/media/Image";

type AuctionCardProp = {
  auction: Auction;
  isMyAuction?: boolean;
  onOpenDetails?: () => void;
};

const AuctionCard = ({
  auction,
  isMyAuction = false,
  onOpenDetails,
}: AuctionCardProp) => {
  const navigate = useNavigate();

  const { product } = auction;

  const handleOpenDetails = () => {
    navigate(`/auctions/${auction.id}`);
    if (onOpenDetails) onOpenDetails();
  };

  return (
    <div className="auction-card">
      <div className="card-image-div pointer back-secondary">
        <div className="pointer image" onClick={handleOpenDetails}>
          <SingleImage
            width="100% "
            image={{
              src: product.mainImage?.src,
              alt: product.mainImage?.alt,
            }}
          />
        </div>
        <div className="info pointer-none">
          <Tooltip title="Number of auction bids">
            <div className="info-text">
              <FontAwesomeIcon icon={"gavel"} />
              <p className="font-4">{auction.auctionBidsCount}</p>
            </div>
          </Tooltip>
          <Tooltip title="Number of auction seens">
            <div className="info-text">
              <FontAwesomeIcon icon={"eye"} />
              <p className="font-4">{auction.auctionSeenCount}</p>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="upper-card flexcol back-secondary font-dark">
        <div className="mt-2 pointer" onClick={handleOpenDetails}>
          <h4 className="bold font-4  capitalize mr-2">{product.title}</h4>
        </div>
        <div className="flexbox mt-1">
          <p className="mr-2">
            Starting:
            <span className="bold font-5 ml-1 font-light">
              ${auction.startingPrice}
            </span>
          </p>
          |
          <p className="ml-2">
            Current:
            <span className="bold font-5 ml-1 font-light">
              ${auction.currentPrice}
            </span>
          </p>
        </div>
        <div className="flexbox mt-2">
          {auction.buyoutPrice && (
            <>
              <p className="mr-2">
                Buyout price:
                <span className="bold font-5 ml-1 font-light">
                  ${auction.buyoutPrice}
                </span>
              </p>
              |
            </>
          )}
          {product.seller && (
            <div className="flexbox  ml-2">
              <p>{product.seller.placeName}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flexbox mt-2">
        <p>Ends at: {formatDate(auction.endsAt, "long")}</p>
      </div>
      <div className="flexbox mt-1">
        <Button
          btnClass="auction-card-button secondary mr-2"
          text="Open details"
          handleClickFunction={handleOpenDetails}
        />
        {!isMyAuction && <AddToWishlist auctionId={auction.id} />}
      </div>
    </div>
  );
};

export default AuctionCard;
