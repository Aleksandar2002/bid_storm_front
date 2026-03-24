import { create } from "zustand";
import { getFromLocalStorage } from "../services/localStorage";
import { getWishlistAuctionsIds } from "../services/wishlistService";

type WishlistState = {
  auctionIds: number[];
  fetchWishlist: () => Promise<void>;
  addAuction: (auctionId: number) => void;
  removeAuction: (auctionId: number) => void;
  checkIfExist: (auctionId: number) => boolean;
};

const savedItems = getFromLocalStorage("wishlistItems") || [];

export const useWishlistStore = create<WishlistState>((set, get) => ({
  auctionIds: savedItems,
  fetchWishlist: async () => {
    try {
      const resp = await getWishlistAuctionsIds();
      if (resp.status == 200) {
        const ids = resp.data.auctionIds || resp.data;
        set({ auctionIds: ids });
      }
    } catch (err) {
      console.log(err);
    }
  },
  addAuction: (auctionId: number) =>
    set((state) => {
      if (state.auctionIds.includes(auctionId)) return state;
      return { auctionIds: [...state.auctionIds, auctionId] };
    }),
  removeAuction: (auctionId: number) =>
    set((state) => ({
      auctionIds: state.auctionIds.filter((x) => x !== auctionId),
    })),
  checkIfExist: (auctionId: number) => {
    const currentIds = get().auctionIds;
    if (currentIds.includes(auctionId)) return true;
    return false;
  },
  // removeAuction: (auctionId: number) => {
  //   const currentIds = get().auctionIds;
  //   if (currentIds.includes(auctionId)) {
  //     const newIds = currentIds.filter((x) => x !== auctionId);
  //     set({ auctionIds: newIds });
  //   }
  // },
}));
