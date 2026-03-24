import React from "react";
import type { Auction } from "../../types/Auction";
import AuctionListItem from "./AuctionListItem";

type AuctionListProps = {
  auctions: Auction[];
  isMyAuctionPage?: boolean;
};

const AuctionList = ({
  auctions,
  isMyAuctionPage = false,
}: AuctionListProps) => {
  return (
    <table className="table w-full auction-list">
      <tbody>
        {auctions && auctions.length
          ? auctions.map((auction) => (
              <AuctionListItem
                key={auction.id}
                auction={auction}
                isMyAuction={isMyAuctionPage}
              />
            ))
          : ""}
      </tbody>
    </table>
  );
};

export default AuctionList;
