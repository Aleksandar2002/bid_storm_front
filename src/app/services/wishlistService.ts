import api from "../../api/axios";
import { useToast } from "../stores/toastMessageStore";
import { useWishlistStore } from "../stores/wishlistStore";
import { addToLocalStorage } from "./localStorage";

export const handleAddToWishlist = async (auctionId: number) => {
  const { setSuccessToast } = useToast.getState();

  const wishlistStore = useWishlistStore.getState();
  const doesExist = wishlistStore.checkIfExist(auctionId);

  let updatedIds: number[];

  try {
    if (!doesExist) {
      wishlistStore.addAuction(auctionId);
      updatedIds = [...wishlistStore.auctionIds, auctionId];
      setSuccessToast(`Auction has been added`);
      await addAuctionToDbWishlist(auctionId);
    } else {
      wishlistStore.removeAuction(auctionId);
      updatedIds = wishlistStore.auctionIds.filter((x) => x !== auctionId);
      setSuccessToast(`Auction has been removed`);
      await removeAuctionFromDbWishlist(auctionId);
    }
    addToLocalStorage("wishlistItems", updatedIds);
  } catch (err) {
    console.log(err);
    if (!doesExist) {
      wishlistStore.removeAuction(auctionId);
    } else {
      wishlistStore.addAuction(auctionId);
    }

    addToLocalStorage("wishlistItems", wishlistStore.auctionIds);

    const { setErrorToast } = useToast.getState();
    setErrorToast("Failed to update wishlist. Please try again.");
  }
};

export const addAuctionToDbWishlist = async (auctionId: number) => {
  return await api.put(
    "wishlists/auction/" + auctionId,
    {},
    {
      headers: { "x-no-loader": "true" },
    },
  );
};

export const removeAuctionFromDbWishlist = async (auctionId: number) => {
  return await api.delete("wishlists/auction/" + auctionId, {
    headers: { "x-no-loader": "true" },
  });
};

export const getWishlistAuctionsIds = async () => {
  return await api.get("wishlists/getAuctionIds");
};

export const getWishlistAuctions = async (ids: number[]) => {
  return await api.get("wishlists/getAuctions", {
    params: {
      ids: ids,
    },
    paramsSerializer: {
      indexes: null, // Ovo uklanja []
    },
  });
};
