/* eslint-disable @typescript-eslint/no-explicit-any */
export const addToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key: string) => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};
export const getFromLocalStorage = (key: string) => {
  const val = localStorage.getItem(key);
  if (!val) return null;
  return JSON.parse(val);
};
