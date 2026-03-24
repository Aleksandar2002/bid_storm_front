import { useAuthStore } from "../../app/stores/authStore";
import type { Auction } from "../../types/Auction";

export const useAuctionPermissions = (auction: Auction | null) => {
  const user = useAuthStore((state) => state.user);

  if (!auction || !user) return { isOwner: false };

  const isOwner = user.id == auction.product.sellerId;
  return { isOwner };
};
