import z from "zod";
import type { IFormField } from "../../../../../shared/components/form/IFormFIeld";

export const nameEntitySchema = z.object({
  name: z.string(),
});

export type NameEntityFormType = z.infer<typeof nameEntitySchema>;

export const nameFields: Array<IFormField<NameEntityFormType>> = [
  {
    id: "name",
    label: "Name",
    name: "name",
    type: "textField",
    cols: 50,
  },
];
