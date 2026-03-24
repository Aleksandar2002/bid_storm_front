import React, { type ReactNode } from "react";
import { useNavigationLinks } from "../../hooks/useNavigationLinks";
import { Link } from "react-router";
import Authorized from "../auth/Authorized";

type NavbarProps = {
  children?: ReactNode;
  orientation?: string;
};

const Navbar = ({ children, orientation }: NavbarProps) => {
  const links = useNavigationLinks();

  return (
    <nav className={orientation}>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Authorized useCaseId={link.useCaseId} role={link.role}>
              <Link to={link.path}>{link.title}</Link>
            </Authorized>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  );
};

export default Navbar;
