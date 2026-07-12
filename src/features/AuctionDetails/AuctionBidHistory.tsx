import { useEffect, useState } from "react";
import { getLatestBids } from "../../app/services/auctionsService";
import type { Bid } from "../../types/Bid";
import GenericTable from "../../shared/components/generics/GenericTable";
import { cols, type AuctionBidHistoryTable } from "./data/bidHistoryTableData";

type AuctionBidHistory = {
  auctionId: number;
};

const AuctionBidHistory = ({ auctionId }: AuctionBidHistory) => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const fetchBidData = async () => {
      const resp = await getLatestBids(auctionId);
      if (resp.status == 200) {
        setBids(resp.data.latestBids);
      }
    };

    fetchBidData();
  }, [auctionId]);

  return (
    <div className="bid-history w-full rounded shadow-light">
      <div className="wrapper">
        <div className="mb-20">
          <h2 className="font-11 bold">Latest bids</h2>
          <hr className="line" />
        </div>
        <div className="flexcol justify-center h-full">
          {bids && bids.length ? (
            <GenericTable<AuctionBidHistoryTable>
              cols={cols}
              rows={bids}
              tableClass={"light"}
              restrictions={{ shouldRowNumberBeVisible: true }}
            />
          ) : (
            <h2 className="font-14 bold mt-20 back-light rounded shadow-dark px-10 py-4">
              No bids yet
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionBidHistory;
