/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from "react-router";
import GenericTable from "../../shared/components/generics/GenericTable";
import { useEffect, useState } from "react";
import {
  getEntityTableData,
  type EntityData,
} from "./tableData/allEntities.tsx";
import GenericForm from "../../shared/components/generics/GenericForm";
import { auctionSortingOptions } from "../AuctionsView/data/sortingOptions";
import SortingSelect from "../../shared/components/partial/SortingSelect";
import Button from "../../shared/components/global/Button";

const Dashboard = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState<any>();
  const [sorting, setSorting] = useState<string | null>(null);

  const [entityData, setEntityData] = useState<EntityData<any, any> | null>();
  const [entity, setEntity] = useState<string | null>();
  const navigate = useNavigate();

  useEffect(() => {
    const init = () => {
      const entityName = searchParams.get("entity");
      setEntity(entityName);
      if (entityName) {
        const data = getEntityTableData(entityName);
        if (data) {
          setEntityData(data);
          return;
        }
        setEntityData(null);
      }
    };
    init();
  }, [searchParams]);

  const [, setSearchParams] = useSearchParams();
  const setTablePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
  };

  const handleFormSubmit = (data: any) => {
    setFilters(data);
    setTablePage(1);
  };

  const handleReset = () => {
    setFilters(null);
    setTablePage(1);
    setSorting(null);
  };

  const handleClick = () => {
    navigate(`/dashboard/form?entity=${entity}&method=create`);
  };

  return (
    <div className="container back-main">
      {entityData && entity ? (
        <>
          <span className="mb-10">
            <h2 className="font-12 bold">{entityData.title}</h2>
            <hr className="line" />
          </span>
          <div className="w-full dashboard-header">
            <div className="mb-5 flexbox justify-start">
              {entityData.sortingOptions && (
                <SortingSelect
                  options={auctionSortingOptions}
                  onChange={(val) => setSorting(val)}
                  defaultValue={String(sorting)}
                />
              )}
              {!entityData.hideInsert && (
                <div className="ml-4">
                  <Button handleClickFunction={handleClick}>Add new</Button>
                </div>
              )}
            </div>
            {entityData.searchFields && entityData.searchValidation ? (
              <div className="w-full mb-5">
                <GenericForm
                  key={entityData.title}
                  fields={entityData.searchFields}
                  validation={entityData.searchValidation}
                  onSubmitAction={handleFormSubmit}
                  submitBtnText="Filter"
                  isIndependent={false}
                  shouldResetAfterSubmit={false}
                  onReset={handleReset}
                  method="Get"
                />
              </div>
            ) : null}
          </div>

          <GenericTable
            tableClass="w-full"
            cols={entityData.cols}
            endpoints={{
              ...entityData.endpoints,
              updateForm: `/dashboard/form?entity=${entity}&method=update`,
            }}
            mapDataOnResponse={entityData.mapDataOnResponse}
            filters={filters}
            sorting={sorting ? String(sorting) : undefined}
            shouldPaginate={true}
            restrictions={entityData.restrictions}
            isCrudTable={true}
            customActions={entityData.customActions}
          />
        </>
      ) : (
        <h2 className="font-12 bold mt-20 back-light rounded shadow-dark px-10 py-4">
          Entity data is missing
        </h2>
      )}
    </div>
  );
};

export default Dashboard;
