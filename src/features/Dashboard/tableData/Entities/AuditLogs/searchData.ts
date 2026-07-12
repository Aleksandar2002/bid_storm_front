import z from "zod";
import type { IFormField } from "../../../../../shared/components/form/IFormFIeld";
import { optionalDate } from "../../../../../shared/utils/zodHelpers";

export const auditLogSearchSchema = z.object({
  actorUsername: z.string().optional().catch(""),
  useCaseName: z.string().optional().catch(""),
  executedAt: optionalDate,
  guid: z.string().optional().catch(""),
});

export type AuditLogSearchType = z.infer<typeof auditLogSearchSchema>;

export const auditLogSearchFields: IFormField<AuditLogSearchType>[] = [
  {
    name: "actorUsername",
    label: "Actor username",
    type: "text",
    textFieldType: "text",
    cols: 24,
    rowOffsetRight: 2,
  },
  {
    name: "useCaseName",
    label: "UseCase name",
    type: "text",
    textFieldType: "text",
    cols: 24,
  },
  {
    label: "*Executed at",
    name: "executedAt",
    type: "datePicker",
    cols: 24,
    rowOffsetRight: 2,
  },
  {
    name: "guid",
    label: "Guid",
    type: "text",
    textFieldType: "text",
    cols: 24,
  },
];
