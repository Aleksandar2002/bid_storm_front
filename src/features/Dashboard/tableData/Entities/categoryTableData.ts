/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TableColumn } from "../../../../shared/components/generics/data/genericTableTypes";

export type CategoryDashboardTable = {
  id: number;
  name: string;
};
export const categoryCols: TableColumn<CategoryDashboardTable>[] = [
  {
    name: "id",
    type: "text",
  },
  {
    name: "name",
    type: "text",
  },
];
