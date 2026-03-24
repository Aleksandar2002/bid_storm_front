import z from "zod";
import type { IFormField } from "../../../shared/components/form/IFormFIeld";

export const registerSchema = z
  .object({
    email: z.email({
      message: "Invalid email format",
    }),
    username: z
      .string()
      .regex(
        /^[a-zA-Z0-9._\s]{3,30}$/,
        "Invalid username format (must be between 3 and 30 chars)",
      ),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=<>?.]{8,40}$/,
        "Invalid password format (must contains one big and small letter, and a number)",
      ),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=<>?.]{8,40}$/,
        "Invalid password format (must contains one big and small letter, and a number)",
      ),
    firstName: z
      .string()
      .regex(/^[A-Z][A-z\s]{3,20}$/, "Invalid first name format"),
    lastName: z
      .string()
      .regex(/^[A-Z][A-z\s]{3,20}$/, "Invalid last name format"),
    dateOfBirth: z
      .preprocess(
        (val) => {
          if (!val || val === "") return undefined;
          return new Date(val as string);
        },
        z
          .date()
          .min(new Date("1920-01-01"), { message: "Must be younger than 1920" })
          .max(new Date(), { message: "Can't be in the future!" }),
      )
      .transform((val) => {
        return val instanceof Date ? val.toISOString().split("T")[0] : val;
      }),
    gender: z.coerce.number().pipe(
      z.union([z.literal(1), z.literal(2)], {
        error: "Gender must be Male or Female",
      }),
    ),
    street: z.coerce
      .string()
      .regex(
        /^[A-Za-zČĆŽŠĐčćžšđ0-9\s.-]{3,50}$/,
        "Street name must be 3-50 characters and contain only letters, numbers, spaces, dot or dash",
      ),
    streetNumber: z
      .string()
      .regex(
        /^[0-9]+[A-Za-z]?([\\/-][0-9]+)?$/,
        "Invalid street number format",
      ),
    apartmentNumber: z.number().int().nullable().optional(),
    phoneNumber: z
      .string()
      .regex(/^(\+?\d{1,3}[- ]?)?\d{7,15}$/, "Invalid phone number format"),
    placeId: z.number().gt(0, "You need to choose city."),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords must be the same",
    path: ["confirmPassword"],
  });

export type RegistrationFormType = z.infer<typeof registerSchema>;

export const registerFormFields: Array<IFormField<RegistrationFormType>> = [
  {
    label: "*Email",
    name: "email",
    type: "textField",
    cols: 24,
    rowOffsetRight: 2,
  },
  {
    label: "*Username",
    name: "username",
    type: "textField",
    cols: 24,
  },
  {
    label: "*Password",
    name: "password",
    type: "textField",
    cols: 24,
    rowOffsetRight: 2,
    textFieldType: "password",
  },
  {
    label: "*Confirm password",
    name: "confirmPassword",
    type: "textField",
    cols: 24,
    textFieldType: "password",
  },
  {
    label: "*First name",
    name: "firstName",
    type: "textField",
    cols: 16,
    rowOffsetRight: 1,
  },
  {
    label: "*Last name",
    name: "lastName",
    type: "textField",
    cols: 16,
    rowOffsetRight: 1,
  },
  {
    label: "*Phone number",
    name: "phoneNumber",
    type: "textField",
    cols: 16,
  },
  {
    label: "*Date of birth",
    name: "dateOfBirth",
    type: "datePicker",
    cols: 16,
    rowOffsetRight: 1,
  },
  {
    label: "*Gender",
    name: "gender",
    type: "select",
    cols: 16,
    rowOffsetRight: 1,
    options: [
      {
        value: 1,
        title: "Male",
      },
      {
        value: 2,
        title: "Female",
      },
    ],
  },
  {
    label: "*City",
    name: "placeId",
    type: "select",
    cols: 16,
    dataSource: {
      url: "places",
      propertyTitleName: "name",
      propertyValueName: "id",
    },
  },
  {
    label: "*Street",
    name: "street",
    type: "textField",
    rowOffsetRight: 1,
    cols: 16,
  },
  {
    label: "*Street number",
    name: "streetNumber",
    type: "textField",
    rowOffsetRight: 1,
    cols: 16,
  },
  {
    label: "Appartment number",
    name: "apartmentNumber",
    type: "textField",
    cols: 16,
  },
];
