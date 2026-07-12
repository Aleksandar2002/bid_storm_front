import type { TableColumn } from "../../../../../shared/components/generics/data/genericTableTypes";

export type AuditLogDashboardTable = {
  id: number;
  useCaseName: string;
  ipAddress?: string;
  userAgent?: string;
  additionalInfo?: string;
  searchData?: object;
  executedAt: number;
  guid: string;
  actor: string;
};
export const auditLogCols: TableColumn<AuditLogDashboardTable>[] = [
  {
    name: "id",
  },
  {
    name: "useCaseName",
    label: "Use case name",
  },
  {
    name: "actor",
  },
  {
    name: "executedAt",
    type: "date",
    label: "Executed at",
    dateType: "long",
  },
  {
    name: "guid",
  },
  {
    name: "ipAddress",
    label: "IP address",
  },
  {
    name: "userAgent",
    label: "User agent",
  },
  {
    name: "additionalInfo",
    label: "Additional info",
  },
  {
    name: "searchData",
    label: "Search data",
  },
];
