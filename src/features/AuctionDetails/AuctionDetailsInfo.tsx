import SelectableImageGrid from "../../shared/components/media/SelectableImageGrid";
import type { Image } from "../../types/Image";
import type { Auction } from "../../types/Auction";
import AddToWishlist from "../Auctions/AddToWishlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AuctionDetailsInfo = {
  auction: Auction;
  isOwner: boolean;
};

const AuctionDetailsInfo = ({ auction, isOwner }: AuctionDetailsInfo) => {
  const images: Image[] = auction.product.auctionImages;

  return (
    <div className="auction-details flexcol back-secondary rounded shadow-dark">
      <SelectableImageGrid
        images={
          auction.product.mainImage
            ? [
                {
                  src: auction.product.mainImage?.src,
                  alt: auction.product.mainImage?.alt,
                },
                ...images,
              ]
            : [...images]
        }
      />
      <div className="auction-text font-dark">
        <div className="flexbox align-end justify-start mt-5">
          <div className="flexbox mb-1  rounded pl-4 pr-4">
            <FontAwesomeIcon icon={"eye"} />
            <p className="font-4 ml-1">{auction.auctionSeenCount}</p>
          </div>
          <h3 className=" bold font-9">{auction.product.title}</h3>
        </div>
        <p className="mt-4 text-left">{auction.product.description}</p>
      </div>
      {!isOwner && (
        <div className="add-to-wishlist-div">
          <AddToWishlist auctionId={auction.id} />
        </div>
      )}
    </div>
  );
};

export default AuctionDetailsInfo;
