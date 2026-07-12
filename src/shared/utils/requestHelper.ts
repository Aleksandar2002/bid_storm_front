/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeCleanSearchParams = (filters: any) => {
  const filteredEntries = Object.entries(filters).filter(([, value]) => {
    return value !== "" && value !== null && value !== undefined && value !== 0;
  });

  return Object.fromEntries(filteredEntries);
};
