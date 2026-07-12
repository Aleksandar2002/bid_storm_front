import { useAuthStore } from "../../../app/stores/authStore";
import SingleImage from "../media/SingleImage";
import { Link } from "react-router";
import { logout } from "../../../app/services/authService";
import { useState } from "react";

const UserProfileHeaderSection = () => {
  const user = useAuthStore((state) => state.user);
  const removeUser = useAuthStore((state) => state.removeUser);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  if (!user) return null;

  const handleLogoutClick = async () => {
    await logout();
    removeUser();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="submenu-parent ml-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SingleImage
        imageClass="small-image user-avatar"
        image={{ src: user.avatar, alt: "User avatar pic" }}
      ></SingleImage>
      <div
        className={"submenu rounded shadow-dark " + (isHovered ? "show" : "")}
      >
        <ul>
          <li>
            <p>{user.username}</p>
          </li>
          <li>
            <Link to="/profile">My profile</Link>
          </li>
          <li>
            <a onClick={handleLogoutClick}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileHeaderSection;
