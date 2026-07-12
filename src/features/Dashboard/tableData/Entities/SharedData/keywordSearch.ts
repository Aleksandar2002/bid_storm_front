import z from "zod";
import type { IFormField } from "../../../../../shared/components/form/IFormFIeld";

export const keywordScheme = z.object({
  keyword: z.string().optional().catch(""),
});

export type KeywordSearchType = z.infer<typeof keywordScheme>;

export const keywordSearch: IFormField<KeywordSearchType>[] = [
  {
    name: "keyword",
    label: "Keyword",
    type: "text",
    textFieldType: "text",
    cols: 50,
  },
];
