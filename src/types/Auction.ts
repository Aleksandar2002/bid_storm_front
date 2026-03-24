import type { Product } from "./Product";
import type { User } from "./User";

export type Auction = {
  id: number;
  auctionCode: string;

  validFrom?: string;
  endsAt: string;
  lastBidAt?: string;

  currentPrice: number;
  startingPrice: number;
  reservePrice?: number;
  buyoutPrice?: number;
  minimumStep: number;

  status?: number;
  statusAsString: string;

  winnerId?: number;
  winner?: User;

  auctionBidsCount: number;
  auctionSeenCount: number;

  product: Product;
};
