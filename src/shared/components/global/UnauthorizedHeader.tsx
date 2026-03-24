import { Link, useNavigate } from "react-router";
import Button from "./Button";
import Logo from "../partial/Logo";

const UnauthorizedHeader = () => {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(route);
  };
  return (
    <header className="w-full unauthorized-header ">
      <div className="wrapper flexbox">
        <Logo />
        <div>
          <Link className="mr-10" to={"/landing"}>
            Home
          </Link>
          <Button
            btnClass="mr-2"
            handleClickFunction={() => handleClick("/login")}
          >
            Sign in
          </Button>
          <Button
            btnClass="mr-5"
            handleClickFunction={() => handleClick("/register")}
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default UnauthorizedHeader;
