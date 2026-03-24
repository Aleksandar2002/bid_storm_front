import { createBrowserRouter, redirect } from "react-router";
import GuestLayout from "../layouts/GuestLayout";
import Register from "../features/Auth/Register";
import UserLayout from "../layouts/UserLayout";
import Auctions from "../features/AuctionsView/Auctions";
import AuthGuard from "../routes/AuthGuard";
import GuestGuard from "../routes/GuestGuard";
import Login from "../features/Auth/Login";
import AccessCodeVerification from "../features/Auth/AccessCodeVerification";
import { routerLoader } from "../routes/routerLoader";
import AddAuction from "../features/AddAuction/AddAuction";
import Profile from "../features/User/Profile";
// import AuctionHistory from "../features/User/AuctionHistory";
import Dashboard from "../features/Dashboard/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import AdminGuard from "../routes/AdminGuard";
import MyAuctions from "../features/AuctionsView/MyAuctions";
import AuctionDetails from "../features/AuctionDetails/AuctionDetails";
import Wishlist from "../features/User/Wishlist/Wishlist";
import LandingPage from "../features/LandingPage/LandingPage";

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
        path: "/landing",
        Component: LandingPage,
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
                path: "/auctions/:id",
                Component: AuctionDetails,
              },
              {
                path: "/profile",
                Component: Profile,
              },
              {
                path: "/myAuctions",
                Component: MyAuctions,
              },
              {
                path: "/wishlist",
                Component: Wishlist,
              },
            ],
          },
          {
            Component: AdminGuard,
            children: [
              {
                Component: AdminLayout,
                children: [{ path: "/dashboard", Component: Dashboard }],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
