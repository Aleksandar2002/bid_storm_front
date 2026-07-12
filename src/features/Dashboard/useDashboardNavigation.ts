export type DashboardLink = {
  title: string;
  entity: string;
};

export const useDashboardNavigation: () => DashboardLink[] = () => {
  return [
    { title: "Auction", entity: "Auction" },
    { title: "Auction History", entity: "AuctionHistory" },
    { title: "Audit Log", entity: "AuditLog" },
    { title: "Bid", entity: "Bid" },
    { title: "Country", entity: "Country" },
    { title: "Place", entity: "Place" },
    // { title: "Product", entity: "Product" }, // ovo mozda ima smisla ali nema vremena
    { title: "Product Category", entity: "ProductCategory" },
    { title: "Role", entity: "Role" },
    // { title: "Role Use Case", entity: "RoleUseCase" },
    { title: "User", entity: "User" },
    // { title: "User Like", entity: "UserLike" },
    // { title: "User Notification", entity: "UserNotification" },
    { title: "User Review", entity: "UserReview" },
    { title: "User Verification", entity: "UserVerification" },
    // { title: "Wish List", entity: "WishList" },
  ] as DashboardLink[];
};
