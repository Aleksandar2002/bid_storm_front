import { useEffect, useState } from "react";
import { getWishlistAuctions } from "../../../app/services/wishlistService";
import type { Auction } from "../../../types/Auction";
import { useWishlistStore } from "../../../app/stores/wishlistStore";
import AuctionList from "../../AuctionsView/AuctionList";

const Wishlist = () => {
  const [auctions, setAuctions] = useState<Auction[]>();
  const auctionIds = useWishlistStore((state) => state.auctionIds);
  useEffect(() => {
    const fetchAuctionInWishlist = async () => {
      const resp = await getWishlistAuctions(auctionIds);
      if (resp.status == 200) {
        setAuctions(resp.data.items);
      }
    };
    fetchAuctionInWishlist();
  }, [auctionIds]);
  return (
    <div className="container">
      <h2>Wishlist</h2>
      {auctions && <AuctionList auctions={auctions} />}
    </div>
  );
};

export default Wishlist;
