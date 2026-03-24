import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

type Link = {
  path: string;
  icon: IconDefinition;
};

const SocialLinks = () => {
  const links: Link[] = [
    {
      path: "https://instagram.com",
      icon: faInstagram,
    },
    {
      path: "https://youtube.com",
      icon: faYoutube,
    },
    {
      path: "https://x.com",
      icon: faXTwitter,
    },
    {
      path: "https://linkedin.com",
      icon: faLinkedin,
    },
  ];

  return (
    <nav className="socials">
      <ul>
        {links.map((link) => (
          <li className="social-link " key={link.path}>
            <Link className="primary" target="_blank" to={link.path}>
              <FontAwesomeIcon icon={link.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SocialLinks;
