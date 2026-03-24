import { z } from "zod";
import type { IFormField } from "../../../shared/components/form/IFormFIeld";

const optionalDateSchema = z.preprocess((arg) => {
  if (typeof arg === "string" && arg === "") return undefined; // Ako je prazan string, šalji null
  return arg;
}, z.coerce.date().nullable().optional());

export const schema = z.object({
  keyword: z.string().optional().catch(""),
  title: z.string().optional().catch(""),

  categoryId: z.number().int().nullable().optional(),
  placeId: z.number().int().nullable().optional(),
  sellerId: z.number().int().nullable().optional(),
  ownerId: z.number().int().nullable().optional(),

  validFrom: optionalDateSchema,
  endsAt: optionalDateSchema,

  // Decimalni brojevi (cene)
  minPrice: z.coerce.number().min(0).nullable().optional(),
  maxPrice: z.coerce.number().min(0).nullable().optional(),

  // Stanje predmeta (Condition enum/int)
  condition: z.number().int().nullable().optional(),
});

// Tip izveden iz šeme za TypeScript
export type FormType = z.infer<typeof schema>;

export const formFields: IFormField<FormType>[] = [
  {
    name: "keyword",
    label: "Keyword",
    type: "text",
    textFieldType: "text",
    cols: 10,
    rowOffsetRight: 1,
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
    cols: 7,
    rowOffsetRight: 1,
  },
  {
    name: "placeId",
    label: "Place",
    type: "select",
    dataSource: {
      url: "/places",
      propertyTitleName: "name",
      propertyValueName: "id",
    },
    cols: 7,
    rowOffsetRight: 1,
  },
  {
    label: "*Auction condition",
    name: "condition",
    type: "select",
    dataSource: {
      url: "lookup/conditions",
    },
    cols: 7,
    rowOffsetRight: 1,
    shouldSortSelectOptions: false,
  },
  {
    name: "minPrice",
    label: "Minimum Price",
    type: "text",
    cols: 7,
    rowOffsetRight: 1,
  },
  {
    name: "maxPrice",
    label: "Maximum Price",
    type: "text",
    cols: 7,
  },
  {
    name: "validFrom",
    label: "Start Date",
    type: "datePicker",
    dateType: "datetime-local",
    cols: 10,
    rowOffsetRight: 1,
  },
  {
    name: "endsAt",
    label: "End Date",
    type: "datePicker",
    dateType: "datetime-local",
    cols: 10,
  },
];
