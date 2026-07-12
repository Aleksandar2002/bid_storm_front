import { useAuthStore } from "../../../app/stores/authStore";
import { useNavigate } from "react-router";
import SearchBox from "../partial/SearchBox";
import Navbar from "../partial/Navbar";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWishlistStore } from "../../../app/stores/wishlistStore";
import Logo from "../partial/Logo";
import UnauthorizedHeader from "./UnauthorizedHeader";
import { useNotificationStore } from "../../../app/stores/notificationsStore";
import api from "../../../api/axios";
import UserProfileHeaderSection from "../partial/UserProfileHeaderSection";

function Header() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const wishlistCount = useWishlistStore((state) => state.auctionIds.length);
  const notificationsCount = useNotificationStore(
    (state) => state.unreadNotificationsCount,
  );

  const handleOpenNotifications = () => {
    navigate("notifications");
  };

  const handleOpenWishlist = () => {
    navigate("wishlist");
  };

  const handleAddAuction = () => {
    navigate("auctions/add");
  };

  const sendNotification = async () => {
    await api.get("/test/sendNotifications");
  };

  return (
    <header>
      <div className="wrapper">
        {user ? (
          <>
            <Logo />
            <SearchBox />
            <Button handleClickFunction={() => sendNotification()}>
              Send notification
            </Button>
            <Navbar />
            <div className="btns">
              <Button
                btnClass="primary notification-nav-btn no-hover"
                handleClickFunction={handleOpenNotifications}
              >
                <span>
                  <FontAwesomeIcon icon={"bell"} />
                  {notificationsCount > 0 && (
                    <span className="notification-count">
                      {notificationsCount}
                    </span>
                  )}
                </span>
              </Button>
              <Button
                btnClass="primary wishlist-nav-btn no-hover"
                handleClickFunction={handleOpenWishlist}
              >
                <span>
                  <FontAwesomeIcon icon={"heart"} />
                  {wishlistCount > 0 && (
                    <span className="wishlist-count">{wishlistCount}</span>
                  )}
                </span>
              </Button>
              <Button
                btnClass="secondary"
                text="Create Auction"
                handleClickFunction={handleAddAuction}
              />
              <UserProfileHeaderSection></UserProfileHeaderSection>
            </div>
          </>
        ) : (
          <UnauthorizedHeader />
        )}
      </div>
    </header>
  );
}

export default Header;
