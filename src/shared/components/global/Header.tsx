import { logout } from "../../../app/services/authService";
import { useAuthStore } from "../../../app/stores/authStore";
import { useNavigate } from "react-router";
import SearchBox from "../partial/SearchBox";
import Navbar from "../partial/Navbar";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWishlistStore } from "../../../app/stores/wishlistStore";
import Logo from "../partial/Logo";
import UnauthorizedHeader from "./UnauthorizedHeader";

function Header() {
  const removeUser = useAuthStore((state) => state.removeUser);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const wishlistCount = useWishlistStore((state) => state.auctionIds.length);

  const handleOpenWishlist = () => {
    navigate("wishlist");
  };

  const handleAddAuction = () => {
    navigate("auctions/add");
  };

  const handleLogoutClick = async () => {
    await logout();
    removeUser();
  };

  return (
    <header>
      <div className="wrapper">
        {user ? (
          <>
            <Logo />
            <SearchBox />
            <Navbar />
            <div className="btns">
              <Button
                btnClass="primary wishlist-nav-btn no-hover"
                handleClickFunction={handleOpenWishlist}
              >
                <span>
                  <FontAwesomeIcon icon={"heart"} />
                  <span className="wishlist-count">{wishlistCount}</span>
                </span>
              </Button>
              <Button
                btnClass="secondary"
                text="Create Auction"
                handleClickFunction={handleAddAuction}
              />
              <Button handleClickFunction={handleLogoutClick} text="Logout" />
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
