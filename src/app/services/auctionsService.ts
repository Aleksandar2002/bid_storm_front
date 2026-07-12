import api from "../../api/axios";

export const searchAuctions = async () => {
  return await api.get("auctions");
};

export const unwrapAuctionRepsonse = async () => {};

export const getMyAuctions = async () => {
  return await api.get("auctions/getMyAuctions");
};

export const getAuctionById = async (id: number) => {
  return await api.get("auctions/" + id);
};

export const markAuctionAsSeen = async (id: number) => {
  return await api.post("auctions/auctionHasBeenSeen/" + id);
};

export type PlaceBIdDto = {
  auctionId: number;
  bid: number;
};

export const placeBid = async (dto: PlaceBIdDto) => {
  return await api.post("bids", dto);
};

export const getRecommendedAuctions = async (
  categoryId: number,
  numberOfItems: number = 3,
) => {
  return await api.get(
    `auctions/recommended?categoryId=${categoryId}&numberOfItems=${numberOfItems}`,
  );
};

export const getLatestBids = async (auctionId: number) => {
  return await api.get(`bids/auction/${auctionId}`);
};
