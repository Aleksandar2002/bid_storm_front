import type { ReactNode } from "react";
import type { Endpoints } from "../../../../types/Endpoints";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TableProps<T> = {
  title?: string;
  cols: Array<TableColumn<T>>;
  rows?: Array<T>;
  tableClass?: string;
  endpoints?: Endpoints;
  mapDataOnResponse?: (data: any) => T[];
  restrictions?: TableRestrictions;
  isCrudTable?: boolean;
  filters?: any;
  sorting?: string;
  shouldPaginate?: boolean;
  customActions?: (row: T) => ReactNode;
};

export type TableRestrictions = {
  hideUpdate?: boolean;
  hideDelete?: boolean;
  shouldRowNumberBeVisible?: boolean;
};

export type TableColumn<T> = {
  name: keyof T;
  type?: "image" | "text" | "date" | "decimal";
  label?: string;
  dateType?: "short" | "long";
  numberCurrency?: string;
};
