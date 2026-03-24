import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../global/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchStore } from "../../../app/stores/searchStore";

const SearchBox = () => {
  const navigate = useNavigate();
  const setKeyword = useSearchStore((state) => state.setKeyword);
  const clearKeyword = useSearchStore((state) => state.clearKeyword);
  const keyword = useSearchStore((state) => state.keyword);
  const [search, setSearch] = useState<string>(keyword);

  useEffect(() => {
    setSearch(keyword);
  }, [keyword]);

  const handleSearch = () => {
    if (search) {
      setKeyword(search);
    } else {
      clearKeyword();
    }
    navigate({
      pathname: "/auctions",
    });
  };

  const handleInput = (e: React.InputEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={search}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Search for a product..."
      />
      <Button handleClickFunction={handleSearch}>
        <FontAwesomeIcon icon={"search"} />
      </Button>
    </div>
  );
};

export default SearchBox;
