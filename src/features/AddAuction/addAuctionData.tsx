import z from "zod";
import type { IFormField } from "../../shared/components/form/IFormFIeld";

const date = new Date();
export const schema = z
  .object({
    title: z.string().regex(/^[A-Za-z0-9\s\-_.,!?%()/:;""'’—–]{1,150}$/, {
      message:
        "Title can only contain letters, numbers, hyphens, dots, and commas (max 60 characters).",
    }),
    description: z
      .string()
      .regex(/^[A-Za-z0-9\s\-_.,!?%()/:;""'’—–]{1,2000}$/, {
        message:
          "Description can only contain letters, numbers, and basic punctuation (max 500 characters).",
      }),
    validFrom: z
      .preprocess(
        (val) => {
          if (!val || val === "") return undefined;
          return new Date(val as string);
        },
        z
          .date()
          .min(date, { message: "Must start in the future" })
          .max(new Date().setMonth(date.getMonth() + 2), {
            message: "Max date is two months in the future",
          }),
      )
      .transform((val) => {
        return val instanceof Date ? val.toISOString().split("T")[0] : val;
      }),
    endsAt: z
      .preprocess(
        (val) => {
          if (!val || val === "") return undefined;
          return new Date(val as string);
        },
        z
          .date()
          .min(date, { message: "Must start in the future" })
          .max(new Date().setMonth(date.getMonth() + 6), {
            message: "Max date is six months in the future",
          }),
      )
      .transform((val) => {
        return val instanceof Date ? val.toISOString().split("T")[0] : val;
      }),
    startingPrice: z.coerce
      .number("Must be a number")
      .positive("Must be greater than 0")
      .max(1000000, "Must be less than 1000000")
      .refine((val) => Number.isInteger(val * 100), {
        message: "Can have only two floating points",
      }),
    reservePrice: z.coerce
      .number("Must be a number")
      .positive("Must be greater than 0")
      .max(1000000, "Must be less than 1000000")
      .refine((val) => Number.isInteger(val * 100), {
        message: "Can have only two floating points",
      })
      .optional()
      .or(z.literal("").transform(() => undefined)),
    minimumStep: z.coerce
      .number("Must be a number")
      .positive("Must be greater than 0")
      .max(1000000, "Must be less than 1000000"),
    buyoutPrice: z.coerce
      .number("Must be a number")
      .positive("Must be greater than 0")
      .max(1000000, "Must be less than 1000000")
      .refine((val) => Number.isInteger(val * 100), {
        message: "Can have only two floating points",
      }),
    condition: z
      .number("Must be a number")
      .gt(0, "You need to choose condition."),
    delivery: z.array(z.coerce.number("Must be a number")),
    categoryId: z
      .number("Must be a number")
      .gt(0, "You need to choose category."),
    placeId: z.number("Must be a number").gt(0, "You need to choose city."),
    images: z
      .array(
        z.string({
          message: "Every image must be a string",
        }),
      )
      .min(1, { message: "Min 1 image." })
      .max(10, { message: "Max 10 image." }),
  })
  .refine((data) => data.endsAt > data.validFrom, {
    message: "Ends at must be greater than valid from",
    path: ["endsAt"],
  })
  .refine(
    (data) => {
      if (data.reservePrice === undefined || data.reservePrice === null) {
        return true;
      }
      return data.reservePrice >= data.startingPrice;
    },
    {
      message: "Reserve price must be greater or equal than starting price",
      path: ["minimalPrice"],
    },
  )
  .refine((data) => data.buyoutPrice >= data.startingPrice, {
    message: "Buyout price must be greater or equal to starting price",
    path: ["buyoutPrice"],
  });

export type FormType = z.infer<typeof schema>;

export const formFields: Array<IFormField<FormType>> = [
  {
    label: "*Title",
    name: "title",
    type: "textField",
    cols: 24,
    rowOffsetRight: 2,
  },
  {
    label: "*Category",
    name: "categoryId",
    type: "select",
    cols: 24,
    dataSource: {
      url: "categories",
      propertyTitleName: "name",
      propertyValueName: "id",
    },
  },
  {
    label: "*Valid from",
    name: "validFrom",
    type: "datePicker",
    dateType: "datetime-local",
    cols: 24,
    rowOffsetRight: 2,
  },
  {
    label: "*Ends at",
    name: "endsAt",
    type: "datePicker",
    dateType: "datetime-local",
    cols: 24,
  },
  {
    label: "*Starting price($)",
    name: "startingPrice",
    type: "textField",
    cols: 24,
    rowOffsetRight: 2,
  },
  {
    label: "*Buyout price($)",
    name: "buyoutPrice",
    type: "textField",
    cols: 24,
  },
  {
    label: "Reserve price($)",
    name: "reservePrice",
    type: "textField",
    cols: 24,
    rowOffsetRight: 2,
  },

  {
    label: "*Minimum step",
    name: "minimumStep",
    type: "textField",
    cols: 24,
  },
  {
    label: "*Delivery type",
    name: "delivery",
    type: "multiSelect",
    cols: 24,
    rowOffsetRight: 2,
    dataSource: {
      url: "lookup/deliveryTypes",
    },
  },
  {
    label: "*Description",
    name: "description",
    type: "textArea",
    cols: 24,
    rows: 4,
  },
  {
    label: "*Auction condition",
    name: "condition",
    type: "select",
    cols: 24,
    rowOffsetRight: 2,
    dataSource: {
      url: "lookup/conditions",
    },
  },
  {
    label: "*City",
    name: "placeId",
    type: "select",
    cols: 24,
    dataSource: {
      url: "places",
      propertyTitleName: "name",
      propertyValueName: "id",
    },
  },
  {
    label: "*Auction images",
    name: "images",
    type: "file",
    cols: 50,
    accept: "image/png, image/jpeg, image/jpg, image/webp",
    multiple: true,
  },
];
