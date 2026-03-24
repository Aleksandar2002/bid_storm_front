import type { TableColumn } from "../../../shared/components/generics/GenericTable";

export type AuctionBidHistoryTable = {
  bidAmount: number;
  bidDate: Date;
  bidder: string;
};
export const cols: TableColumn<AuctionBidHistoryTable>[] = [
  {
    name: "bidDate",
    type: "date",
    label: "Bid date",
    dateType: "long",
  },
  {
    name: "bidder",
    type: "text",
    label: "Bidder",
  },
  {
    name: "bidAmount",
    type: "decimal",
    label: "Bid amount",
    numberCurrency: "$",
  },
];
