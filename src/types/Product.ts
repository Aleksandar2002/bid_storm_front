import type { Image } from "./Image";
import type { User } from "./User";

export type Product = {
  id: number;
  title: string;
  description: string;

  condition: number;
  conditionAsString: string;

  sellerId: number;
  categoryId: number;
  placeId: number;
  category: string;
  place: string;
  seller: User;

  mainImage?: Image;
  auctionImages: Image[];

  delivery: number[];
  deliveryAsStrings: string[];
};
