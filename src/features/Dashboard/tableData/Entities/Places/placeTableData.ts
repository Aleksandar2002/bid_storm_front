/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TableColumn } from "../../../../../shared/components/generics/data/genericTableTypes";

export type PlaceDashboardTable = {
  id: number;
  name: string;
  country: string;
  postCode: string;
};
export const placeCols: TableColumn<PlaceDashboardTable>[] = [
  {
    name: "id",
    type: "text",
  },
  {
    name: "name",
    type: "text",
  },
  {
    name: "country",
    type: "text",
  },
  {
    name: "postCode",
    type: "text",
    label: "Postal code",
  },
];
