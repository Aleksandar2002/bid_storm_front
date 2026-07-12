/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableColumn } from "../../../../../shared/components/generics/data/genericTableTypes";
import { formatDateForInput } from "../../../../../shared/utils/dateHelper";
import type { Auction } from "../../../../../types/Auction";

export type AuctionDashboardTable = {
  id: number;
  mainImage: string;
  auctionCode: string;
  title: string;
  category: string;
  startingPrice: number;
  currentPrice: number;
  validFrom: string;
  endsAt: string;
  seller: string;
};
export const auctionCols: TableColumn<AuctionDashboardTable>[] = [
  {
    name: "mainImage",
    type: "image",
    label: "Image",
  },
  {
    name: "id",
  },
  {
    name: "auctionCode",
    label: "Code",
  },
  {
    name: "title",
  },
  {
    name: "category",
  },
  {
    name: "seller",
  },
  {
    name: "startingPrice",
    type: "decimal",
    label: "Starting price",
    numberCurrency: "$",
  },
  {
    name: "currentPrice",
    type: "decimal",
    label: "Current price",
    numberCurrency: "$",
  },
  {
    name: "validFrom",
    type: "date",
    label: "Valid from",
  },
  {
    name: "endsAt",
    type: "date",
    label: "Ends at",
  },
];

export const auctionsTableMap = (data: any): AuctionDashboardTable[] => {
  return data.map((item: Auction) => {
    return {
      ...item,
      mainImage: item.product.mainImage?.src ?? "",
      title: item.product.title,
      seller: item.product.seller.fullName,
      category: item.product.category,
    };
  });
};

export const auctionsFindMap = (data: Auction) => {
  console.log(data);

  return {
    ...data,
    mainImage: data.product.mainImage?.src ?? "",
    categoryId: data.product.categoryId,
    validFrom: formatDateForInput(String(data.validFrom)),
    endsAt: formatDateForInput(String(data.endsAt)),
    title: data.product.title,
    description: data.product.description,
    placeId: data.product.placeId,
    condition: data.product.condition,
    delivery: data.product.delivery,
    images: data.product.auctionImages.map((x) => x.src),
  };
};
