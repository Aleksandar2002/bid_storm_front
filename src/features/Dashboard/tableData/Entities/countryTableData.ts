import type { TableColumn } from "../../../../shared/components/generics/data/genericTableTypes";

export type CountryDashboardTable = {
  id: number;
  name: string;
};
export const countryCols: TableColumn<CountryDashboardTable>[] = [
  {
    name: "id",
    type: "text",
  },
  {
    name: "name",
    type: "text",
  },
];
