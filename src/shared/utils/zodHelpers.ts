import z from "zod";

export const optionalNumber = () =>
  z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    return val;
  }, z.coerce.number().nullable().optional());

export const optionalDate = z.preprocess((arg) => {
  if (typeof arg === "string" && arg === "") return undefined;
  return arg;
}, z.coerce.date().nullable().optional());
