export type NavigationLink = {
  title: string;
  path: string;
  useCaseId?: number;
};

export const useNavigationLinks = () => {
  return [
    {
      path: "/auctions",
      title: "Auctions",
    },
    {
      path: "/profile",
      title: "My profile",
    },
    {
      path: "/myAuctions",
      title: "My Auctions",
    },
    {
      path: "/watchlist",
      title: "Watchlist",
    },
  ] as NavigationLink[];
};
