export const formatDate = (
  dateInput: Date | string | undefined,
  type: "short" | "long" = "short",
): string => {
  if (!dateInput) return "N/A";

  // 2. Prebacivanje u Date objekat (ako je string)
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error("Invalid date provided to formatDate:", dateInput);
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  if (type === "long") {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = false;
  }

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export const formatDateForInput = (dateString: string) => {
  if (!dateString) return "";
  return dateString.split(".")[0].slice(0, 16);
};

export const parseDate = (data: string | Date) => {
  const date = data instanceof Date ? data : new Date(data);

  if (isNaN(date.getTime())) {
    console.error("Invalid date provided:", data);
    return;
  }
  return date;
};
