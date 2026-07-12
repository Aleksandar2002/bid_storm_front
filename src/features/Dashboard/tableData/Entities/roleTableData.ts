import type { TableColumn } from "../../../../shared/components/generics/data/genericTableTypes";

export type RoleDashboardTable = {
  id: number;
  name: string;
};
export const roleCols: TableColumn<RoleDashboardTable>[] = [
  {
    name: "id",
    type: "text",
  },
  {
    name: "name",
    type: "text",
  },
];
