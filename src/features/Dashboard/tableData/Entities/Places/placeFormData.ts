import z from "zod";
import type { IFormField } from "../../../../../shared/components/form/IFormFIeld";

export const placeEntitySchema = z.object({
  name: z.string(),
  postalCode: z.string(),
  countryId: z.number().gt(0, "You need to choose city."),
});

export type PlaceEntityFormType = z.infer<typeof placeEntitySchema>;

export const placeFields: Array<IFormField<PlaceEntityFormType>> = [
  {
    id: "name",
    label: "Name",
    name: "name",
    type: "textField",
    cols: 50,
  },
  {
    label: "*Country",
    name: "countryId",
    type: "select",
    cols: 24,
    rowOffsetRight: 2,
    dataSource: {
      url: "countries",
      propertyTitleName: "name",
      propertyValueName: "id",
    },
  },
  {
    id: "postalCode",
    label: "Postal code",
    name: "postalCode",
    type: "textField",
    cols: 24,
  },
];
