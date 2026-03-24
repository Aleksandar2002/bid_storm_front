import { Outlet } from "react-router";
import Header from "../shared/components/global/Header";
import Footer from "../shared/components/global/Footer";
import SharedGlobalComponents from "./SharedGlobalComponents";
import { useEffect } from "react";
import { useWishlistStore } from "../app/stores/wishlistStore";
function UserLayout() {
  useEffect(() => {
    const wishlistStore = useWishlistStore.getState();
    wishlistStore.fetchWishlist();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <div className="wrapper">
          <Outlet />
        </div>
      </main>
      <Footer />
      <SharedGlobalComponents />
    </div>
  );
}

export default UserLayout;
