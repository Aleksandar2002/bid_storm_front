import { type ReactNode } from "react";
import Button from "../../shared/components/global/Button";
import { useWishlistStore } from "../../app/stores/wishlistStore";
import Tooltip from "../../shared/components/partial/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleAddToWishlist } from "../../app/services/wishlistService";

type AddToWishlistProp = {
  auctionId: number;
  children?: ReactNode;
};

const AddToWishlist = ({ auctionId, children }: AddToWishlistProp) => {
  const exist = useWishlistStore((state) =>
    state.auctionIds.includes(auctionId),
  );
  const handleAddToWatchlist = () => {
    handleAddToWishlist(auctionId);
  };

  return (
    <>
      <Tooltip title={!exist ? "Add to wishlist" : "Remove from wishlist"}>
        <Button
          btnClass={
            "auction-card-button  ml-2 no-hover " +
            (exist ? "light" : "primary")
          }
          handleClickFunction={handleAddToWatchlist}
          text={!children ? (!exist ? "Add" : "Remove") : ""}
        >
          {exist ? (
            <FontAwesomeIcon icon={"heart-crack"} />
          ) : (
            <FontAwesomeIcon icon={"heart"} />
          )}
        </Button>
      </Tooltip>
    </>
  );
};

export default AddToWishlist;
