import logo from "../../../assets/images/logo2.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/landing"}>
      <img className="small-image" src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;
