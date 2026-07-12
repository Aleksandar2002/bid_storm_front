import type { TableColumn } from "../../../../../shared/components/generics/data/genericTableTypes";

export type UserDashboardTable = {
  id: number;
  email: string;
  username: string;
  isVerified: boolean;
  lastLogin?: number; // DateTime u C# se često šalje kao timestamp (number) ili string
  isSuperAdmin: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // DateOnly se mapira kao string (YYYY-MM-DD)
  gender: number; // Enum je obično number
  street: string;
  streetNumber: number;
  apartmentNumber?: number;
  phoneNumber: string;
  placeId: number;
  roleId: number;
  placeName: string;
  roleName: string;
  avatar: string;
  numberOfProducts?: number;
  createdReviewsCount?: number;
  receivedReviewsCount?: number;
  likesReceivedCount?: number;
  likesGivenCount?: number;
  auctionsWonCount?: number;
  bidsMadeCount?: number;
  isBanned: boolean;
  banReason: string;
};

export const userCols: TableColumn<UserDashboardTable>[] = [
  {
    name: "id",
  },
  {
    name: "avatar",
    type: "image",
  },
  {
    name: "username",
  },
  {
    name: "email",
  },
  {
    name: "roleName",
    label: "Role",
  },
  {
    name: "isVerified",
    label: "Verified",
  },
  {
    name: "isBanned",
    label: "Status",
  },
  {
    name: "lastLogin",
    type: "date",
    label: "Last login",
    dateType: "long",
  },
  {
    name: "placeName",
    label: "Location",
  },
  {
    name: "numberOfProducts",
    label: "Products",
  },
  {
    name: "auctionsWonCount",
    label: "Wins",
  },
];
