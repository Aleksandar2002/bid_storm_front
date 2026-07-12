import z from "zod";
import type { IFormField } from "../../../../../shared/components/form/IFormFIeld";

export const auctionSearchSchema = z.object({
  keyword: z.string().optional().catch(""),
  categoryId: z.number().int().nullable().optional(),
});

export type AuctionSearchType = z.infer<typeof auctionSearchSchema>;

export const auctionSearchFields: IFormField<AuctionSearchType>[] = [
  {
    name: "keyword",
    label: "Keyword",
    type: "text",
    textFieldType: "text",
    cols: 24,
    rowOffsetRight: 2,
  },
  {
    name: "categoryId",
    label: "Category",
    type: "select",
    dataSource: {
      url: "/categories",
      propertyTitleName: "name",
      propertyValueName: "id",
    },
    cols: 24,
  },
];
