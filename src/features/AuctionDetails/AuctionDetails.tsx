import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAuctionById } from "../../app/services/auctionsService";
import type { Auction } from "../../types/Auction";
import { useToast } from "../../app/stores/toastMessageStore";
import AuctionSellerInfo from "./AuctionSellerInfo";
import AuctionDetailsInfo from "./AuctionDetailsInfo";
import { useAuctionPermissions } from "../../shared/hooks/useAuctionPermissions";
import AuctionBidding from "./AuctionBidding";
import AuctionBidHistory from "./AuctionBidHistory";
import RecommendedItems from "./RecommendedItems";

const AuctionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | undefined>();

  const { isOwner } = useAuctionPermissions(auction || null);

  const { setErrorToast } = useToast();

  useEffect(() => {
    const fetchAuctionData = async () => {
      const auctionId = Number(id);

      if (isNaN(auctionId)) {
        setErrorToast("Auction id must be number");
        return;
      }

      const resp = await getAuctionById(auctionId);
      if (resp.status == 200) setAuction(resp.data as Auction);
    };
    fetchAuctionData();
  }, [id, setErrorToast]);

  return (
    <div className="container auction-details">
      {auction && (
        <div className="flexcol w-full">
          <div className="wrapper">
            <div className="details-div flexbox">
              <AuctionDetailsInfo auction={auction} isOwner={isOwner} />
              <div className="flexcol right-details">
                {!isOwner && <AuctionBidding auction={auction} />}
                <AuctionSellerInfo seller={auction.product.seller} />
              </div>
            </div>
            <AuctionBidHistory auctionId={auction.id} />
            <RecommendedItems categoryId={auction.product.categoryId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionDetails;
