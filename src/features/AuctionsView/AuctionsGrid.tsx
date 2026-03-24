/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import type { Auction } from "../../types/Auction";
import AuctionCard from "./AuctionCard";
import ChangeGridStructureButtons from "./ChangeGridStructureButtons";
import { GridType } from "./data/gridTypes";
import GenericForm from "../../shared/components/generics/GenericForm";
import { formFields, schema, type FormType } from "./formData/searchAuction";
import api from "../../api/axios";
import Pagination from "../../shared/components/partial/Pagination";
import { usePaginationStore } from "../../app/stores/paginationStore";
import { useSearchParams } from "react-router";
import { sortingOptions, type SortingType } from "./data/sortingOptions";
import Select from "../../shared/components/form/Select";
import { useSearchStore } from "../../app/stores/searchStore";
import AuctionList from "./AuctionList";

type AuctionsGridProp = {
  title?: string;
  isMyAuctionPage?: boolean;
  auctionSearchEndpoint: string;
};

const AuctionsGrid = ({
  title,
  isMyAuctionPage = false,
  auctionSearchEndpoint,
}: AuctionsGridProp) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const setPages = usePaginationStore((state) => state.setPages);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<any>({});

  const [sorting, setSorting] = useState<string | null>(null);

  const keyword = useSearchStore((state) => state.keyword);
  const clearKeyword = useSearchStore((state) => state.clearKeyword);

  const currentPage = Number(searchParams.get("page") || 1);
  const storeCurrentPage = usePaginationStore((state) => state.currentPage);
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const setPage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const [defaultSearchParams, setDefaultSearchParams] = useState<FormType>();

  // SETTING VALUE IN STORE FOR LEAVING AND GETTING BACK TO THIS PAGE
  useEffect(() => {
    setPage(1);
    if (storeCurrentPage) {
      setPage(storeCurrentPage);
    }
    return () => {
      setCurrentPage(currentPageRef.current);
    };
  }, []);

  // FETCHING DATA
  useEffect(() => {
    const fetchAuctions = async () => {
      const filteredEntries = Object.entries(filters).filter(([, value]) => {
        return (
          value !== "" && value !== null && value !== undefined && value !== 0
        );
      });

      const cleanParams = Object.fromEntries(filteredEntries);

      if (keyword) {
        cleanParams["keyword"] = keyword;
        setDefaultSearchParams({
          keyword: keyword,
        });
      }

      const resp = await api.get(auctionSearchEndpoint, {
        params: {
          ...cleanParams,
          page: currentPage,
          perPage: 24,
          sorts: [sorting],
        },
        paramsSerializer: {
          indexes: null, // Ovo uklanja []
        },
      });
      if (resp.status == 200) {
        setAuctions(resp.data.items);
        setPages(resp.data.totalPages, resp.data.totalCount);
      }
    };
    fetchAuctions();
  }, [currentPage, auctionSearchEndpoint, filters, sorting, keyword]);

  useEffect(() => {
    const onKeywordChange = () => {
      setDefaultSearchParams({
        keyword: keyword,
      });
    };
    onKeywordChange();
  }, [keyword]);

  // FORM EVENTS
  const handleFormSubmit = (data: FormType) => {
    setFilters(data);
    setPage(1);
  };

  const handleReset = async () => {
    clearKeyword();
    setDefaultSearchParams({});
    setPage(1);
    setFilters({});
  };

  // STRUCTURE
  const [structure, setStructure] = useState<number>(GridType.GRID_COLS);
  const handleStructureChange = (val: number) => {
    setStructure(val);
  };

  const handleSortingChange = (val: string | number) => {
    setSorting(String(val));
  };

  return (
    <div className="auction-grid w-full">
      <div className="grid-header flexbox">
        {title && <h2>{title}</h2>}
        <div className="flexbox">
          <ChangeGridStructureButtons
            value={structure}
            onChange={handleStructureChange}
          />
          <Select<SortingType>
            value={String(sorting)}
            name={"sortingType"}
            onChange={handleSortingChange}
            options={sortingOptions}
            hasDefaultOption={false}
            selectClass="structure-select ml-5"
            shouldReturnNumber={false}
          />
        </div>
      </div>

      <div className="grid-search-form">
        <GenericForm
          key={defaultSearchParams?.keyword}
          fields={formFields}
          validation={schema}
          submitBtnText="Search"
          isIndependent={false}
          shouldResetAfterSubmit={false}
          onSubmitAction={handleFormSubmit}
          onReset={handleReset}
          defaultValues={defaultSearchParams}
        />
      </div>

      {auctions && auctions.length ? <Pagination /> : ""}

      {(!auctions || !auctions.length) && (
        <div className="w-full mgy-5">
          <h2 className="text-center">No auctions found</h2>
        </div>
      )}
      {structure == GridType.GRID_COLS && (
        <div className="auction-cards-div">
          {auctions && auctions.length
            ? auctions.map((auction) => (
                <AuctionCard
                  key={auction.id}
                  auction={auction}
                  isMyAuction={isMyAuctionPage}
                />
              ))
            : ""}
        </div>
      )}
      {structure == GridType.GRID_ROW && (
        <AuctionList auctions={auctions} isMyAuctionPage={isMyAuctionPage} />
      )}
      {auctions && auctions.length ? <Pagination /> : ""}
    </div>
  );
};

export default AuctionsGrid;
