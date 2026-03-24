import React, { useEffect, useState } from "react";
import { getRecommendedAuctions } from "../../app/services/auctionsService";
import type { Auction } from "../../types/Auction";
import AuctionCard from "../AuctionsView/AuctionCard";

type RecommendedItemsProps = {
  categoryId: number;
};

const RecommendedItems = ({ categoryId }: RecommendedItemsProps) => {
  const [auctions, setAuctions] = useState<Auction[]>();
  useEffect(() => {
    const fetchRecommendedAuctions = async () => {
      const resp = await getRecommendedAuctions(categoryId, 3);
      if (resp.status == 200) {
        setAuctions(resp.data.auctions);
      }
    };

    fetchRecommendedAuctions();
  }, [categoryId]);

  const handleOpenDetails = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <div className="flexcol recommended-items rounded back-dark font-light shadow-dark">
      <div>
        <h2 className="font-11 bold">Recommended items</h2>
        <hr className="line" />
      </div>
      {auctions && (
        <div className="w-full flexbox auction-cards-div">
          {auctions.map((auction) => {
            return (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onOpenDetails={handleOpenDetails}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecommendedItems;
