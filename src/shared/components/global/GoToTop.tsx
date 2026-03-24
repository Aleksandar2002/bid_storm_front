import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "./Button";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>();

  const toggleVisibility = () => {
    const threshold = window.innerHeight * 1.2;

    if (window.scrollY > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="go-to-top">
      <Button btnClass="simple-btn" handleClickFunction={scrollToTop}>
        <span>
          <FontAwesomeIcon icon={"angle-up"} />
        </span>
        <span>
          <FontAwesomeIcon icon={"angle-up"} />
        </span>
        <span>
          <FontAwesomeIcon icon={"angle-up"} />
        </span>
      </Button>
    </div>
  );
};

export default GoToTop;
