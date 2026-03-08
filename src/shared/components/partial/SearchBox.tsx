import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SearchBox = () => {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search for a product..." />
      <button>
        <FontAwesomeIcon icon={"search"} />
      </button>
    </div>
  );
};

export default SearchBox;
