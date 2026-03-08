import z from "zod";
import type { IFormField } from "../../../shared/components/form/IFormFIeld";

export const schema = z.object({
  email: z.email({
    message: "Invalid email format",
  }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=<>?.]{8,40}$/,
      "Invalid password format (must contains one big and small letter, and a number)",
    ),
});

export type FormType = z.infer<typeof schema>;

export const fields: Array<IFormField<FormType>> = [
  {
    id: "email",
    label: "Email",
    name: "email",
    type: "textField",
    cols: 50,
  },
  {
    id: "password",
    label: "Password",
    name: "password",
    type: "textField",
    cols: 50,
    textFieldType: "password",
  },
];
