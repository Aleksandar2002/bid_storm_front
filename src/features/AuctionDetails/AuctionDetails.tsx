import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getAuctionById,
  markAuctionAsSeen,
} from "../../app/services/auctionsService";
import type { Auction } from "../../types/Auction";
import { useToast } from "../../app/stores/toastMessageStore";
import AuctionSellerInfo from "./AuctionSellerInfo";
import AuctionDetailsInfo from "./AuctionDetailsInfo";
import { useAuctionPermissions } from "../../shared/hooks/useAuctionPermissions";
import AuctionBidding from "./AuctionBidding";
import AuctionBidHistory from "./AuctionBidHistory";
import RecommendedItems from "./RecommendedItems";
import { useHubs } from "../../shared/hubs/useHubs";

const AuctionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | undefined>();
  const [price, setPrice] = useState<number>();
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const { auctionsHub } = useHubs();

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
      await markAuctionAsSeen(auctionId);
      if (resp.status == 200) setAuction(resp.data as Auction);
    };
    fetchAuctionData();

    const setupConnection = async () => {
      await auctionsHub?.invoke("JoinAuction", Number(id));

      auctionsHub?.on("AuctionHasExpired", () => {
        setIsExpired(true);
      });
    };

    setupConnection();
    return () => {
      if (auctionsHub) auctionsHub?.off("AuctionHasExpired");
    };
  }, [id, setErrorToast, auctionsHub]);

  return (
    <div className="container auction-details">
      {auction && (
        <div className="flexcol w-full">
          <div className="wrapper">
            <div className="details-div flexbox">
              <AuctionDetailsInfo auction={auction} isOwner={isOwner} />
              <div className="flexcol right-details">
                {!isOwner && (
                  <AuctionBidding
                    onPriceChange={(price: number) => {
                      setPrice(price);
                    }}
                    auction={auction}
                    isExpiredProp={isExpired}
                  />
                )}
                <AuctionSellerInfo seller={auction.product.seller} />
              </div>
            </div>
            <AuctionBidHistory key={price} auctionId={auction.id} />
            <RecommendedItems categoryId={auction.product.categoryId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionDetails;
