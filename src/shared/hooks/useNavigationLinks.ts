import { type UseCaseId } from "../../app/Enums/UseCases";

export type NavigationLink = {
  title: string;
  path: string;
  useCaseId?: UseCaseId;
  role?: string;
};

export const useNavigationLinks: () => NavigationLink[] = () => {
  return [
    {
      path: "/landing",
      title: "Home",
    },
    {
      path: "/auctions",
      title: "Auctions",
    },
    {
      path: "/myAuctions",
      title: "My Auctions",
    },
    {
      path: "/dashboard?entity=auction",
      title: "Dashboard",
      role: "Admin",
    },
  ] as NavigationLink[];
};
