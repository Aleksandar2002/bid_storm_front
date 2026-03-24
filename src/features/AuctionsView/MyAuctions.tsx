import AuctionsGrid from "./AuctionsGrid";

const MyAuctions = () => {
  return (
    <div className="container my-auctions">
      <AuctionsGrid
        key="my-auctions"
        title="My auctions"
        auctionSearchEndpoint="auctions/getMyAuctions"
        isMyAuctionPage={true}
      />
    </div>
  );
};

export default MyAuctions;
