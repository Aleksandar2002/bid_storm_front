import React from "react";
import { logout } from "../../app/services/authService";
import { useAuthStore } from "../../app/stores/authStore";
import { Link } from "react-router";
import SearchBox from "./partial/SearchBox";
import Navbar from "./partial/Navbar";

function Header() {
  const removeUser = useAuthStore((state) => state.removeUser);

  const handleLogoutClick = async () => {
    await logout();
    removeUser();
  };

  return (
    <header>
      <div className="wrapper">
        <Link to={"/"}>
          <img src="logo" alt="Logo" />
        </Link>
        <SearchBox />
        <Navbar />
        <div className="btns">
          <button>
            <Link to={"auctions/add"}>Add Auction</Link>
          </button>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
