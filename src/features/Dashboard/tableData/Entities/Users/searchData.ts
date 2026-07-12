import z from "zod";
import type { IFormField } from "../../../../../shared/components/form/IFormFIeld";

export const userSearchSchema = z.object({
  name: z.string().optional().catch(""),
  username: z.string().optional().catch(""),
  phoneNumber: z.string().optional().catch(""),
  roleId: z.number().optional().nullable(),
  isBanned: z.boolean().optional().nullable(),
  isActive: z.boolean().optional().nullable(),
});

export type UserSearchType = z.infer<typeof userSearchSchema>;

export const userSearchFields: IFormField<UserSearchType>[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    textFieldType: "text",
    cols: 16,
    rowOffsetRight: 1,
  },
  {
    name: "name",
    label: "First or Last Name",
    type: "text",
    textFieldType: "text",
    cols: 16,
    rowOffsetRight: 1,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    textFieldType: "text",
    cols: 16,
  },
  {
    name: "roleId",
    label: "User Role",
    type: "select",
    cols: 16,
    rowOffsetRight: 1,
  },
  {
    name: "isBanned",
    label: "Banned Status",
    type: "select",
    cols: 16,
    rowOffsetRight: 1,
    options: [
      { title: "All", value: null },
      { title: "Banned Only", value: true },
      { title: "Not Banned", value: false },
    ],
  },
  {
    name: "isActive",
    label: "Active Status",
    type: "select",
    cols: 16,
    options: [
      { title: "All", value: null },
      { title: "Active", value: true },
      { title: "Inactive", value: false },
    ],
  },
];
