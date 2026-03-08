import api from "../../api/axios";

export const searchAuctions = async () => {
  return await api.get("auctions");
};
