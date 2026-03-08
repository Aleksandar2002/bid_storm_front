import { createBrowserRouter, redirect } from "react-router";
import GuestLayout from "../layouts/GuestLayout";
import Register from "../features/Auth/Register";
import UserLayout from "../layouts/UserLayout";
import Auctions from "../features/Auctions/Auctions";
import AuthGuard from "../routes/AuthGuard";
import GuestGuard from "../routes/GuestGuard";
import Login from "../features/Auth/Login";
import AccessCodeVerification from "../features/Auth/AccessCodeVerification";
import { routerLoader } from "../routes/routerLoader";
import AddAuction from "../features/Auctions/AddAuction";
import Profile from "../features/User/Profile";
import AuctionHistory from "../features/User/AuctionHistory";
import Watchlist from "../features/User/Watchlist";

const router = createBrowserRouter([
  {
    id: "root",
    loader: routerLoader,
    children: [
      {
        path: "/",
        loader: () => redirect("/auctions"),
      },
      {
        Component: GuestGuard,
        children: [
          {
            Component: GuestLayout,
            children: [
              {
                path: "/login",
                Component: Login,
              },
              {
                path: "/register",
                Component: Register,
              },
              {
                path: "/codeVerification",
                Component: AccessCodeVerification,
              },
            ],
          },
        ],
      },
      {
        Component: AuthGuard,
        children: [
          {
            Component: UserLayout,
            children: [
              {
                path: "/auctions",
                Component: Auctions,
              },
              {
                path: "/auctions/add",
                Component: AddAuction,
              },
              {
                path: "/profile",
                Component: Profile,
              },
              {
                path: "/myAuctions",
                Component: AuctionHistory,
              },
              {
                path: "/watchlist",
                Component: Watchlist,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
