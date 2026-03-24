import AuctionsGrid from "./AuctionsGrid";

const Auctions = () => {
  return (
    <div className="container ">
      <AuctionsGrid
        key="all-auctions"
        title="Auctions"
        auctionSearchEndpoint={"auctions"}
      />
    </div>
  );
};

export default Auctions;
