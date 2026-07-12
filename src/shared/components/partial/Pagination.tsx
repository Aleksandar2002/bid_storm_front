import React from "react";
import { usePaginationStore } from "../../../app/stores/paginationStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router";

type PaginationProps = {
  fullWidth?: boolean;
  // totalPages: number;
  // currentPage: number;
};

const Pagination = ({ fullWidth = true }: PaginationProps) => {
  // const currentPage = usePaginationStore((state) => state.currentPage);
  const totalPages = usePaginationStore((state) => state.totalPages);
  const totalCount = usePaginationStore((state) => state.totalCount);
  // const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const setPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleGoToFirst = () => {
    setPage(1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  return (
    <div
      className={
        "flexbox justify-end font-6 mt-5 " + (fullWidth ? "w-full " : "")
      }
    >
      <div className="back-light pagination rounded shadow-dark flexbox">
        <div>
          {currentPage != 1 && (
            <button
              className="simple-btn font-secondary"
              onClick={handleGoToFirst}
            >
              Return to first
            </button>
          )}
          <button className="simple-btn" onClick={handlePreviousClick}>
            <FontAwesomeIcon icon={"angle-left"} />
          </button>
          {currentPage}
          <button className="simple-btn" onClick={handleNextClick}>
            <FontAwesomeIcon icon={"angle-right"} />
          </button>
        </div>
        <span className="mr-2">of</span>
        <span>{totalPages} pages</span>
        <span className="ml-2">({totalCount} items in total)</span>
      </div>
    </div>
  );
};

export default Pagination;
