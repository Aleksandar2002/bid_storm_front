import type { ISelectOption } from "../../../shared/components/form/IFormFIeld";

export type SortingType = {
  sortingType: string;
};

export const auctionSortingOptions: ISelectOption[] = [
  {
    title: "Newest first",
    value: "CreatedAt-desc",
  },
  {
    title: "Oldest first",
    value: "CreatedAt-asc",
  },
  {
    title: "Sort by name ascending",
    value: "Title-asc",
  },
  {
    title: "Sort by name descending",
    value: "Title-desc",
  },
  {
    title: "Most expensive",
    value: "CurrentPrice-desc",
  },
  {
    title: "Cheapest",
    value: "CurrentPrice-asc",
  },
  {
    title: "Soon will end",
    value: "EndsAt-asc",
  },
];
