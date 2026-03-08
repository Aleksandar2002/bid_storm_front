import React, { useEffect } from "react";
import { searchAuctions } from "../../app/services/auctionsService";

function Auctions() {
  useEffect(() => {
    const fetchAuctions = async () => {
      const resp = await searchAuctions();
      console.log(resp);
    };
    fetchAuctions();
  }, []);

  return <div>Auctions</div>;
}

export default Auctions;
