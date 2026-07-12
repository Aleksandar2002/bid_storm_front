import { useEffect, useState, type ReactNode } from "react";
import { formatDate } from "../../utils/dateHelper";
import SingleImage from "../media/SingleImage";
import api from "../../../api/axios";
import Button from "../global/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDialog } from "../../../app/stores/dialogStore";
import { makeCleanSearchParams } from "../../utils/requestHelper";
import Pagination from "../partial/Pagination";
import { usePaginationStore } from "../../../app/stores/paginationStore";
import { useNavigate, useSearchParams } from "react-router";
import { useToast } from "../../../app/stores/toastMessageStore";
import type { TableProps } from "./data/genericTableTypes";
import Tooltip from "../partial/Tooltip";

/* eslint-disable @typescript-eslint/no-explicit-any */

const GenericTable = <T extends Record<string, any>>({
  title,
  cols,
  rows,
  tableClass,
  endpoints,
  mapDataOnResponse,
  restrictions = {
    hideUpdate: false,
    hideDelete: false,
    shouldRowNumberBeVisible: false,
  },
  isCrudTable = false,
  filters,
  sorting,
  shouldPaginate = false,
  customActions,
}: TableProps<T>) => {
  const [bodyData, setBodyData] = useState<ReactNode>([]);
  const [tableRows, setTableRows] = useState<T[]>([]);
  const setErrorToast = useToast((state) => state.setErrorToast);
  const setSuccessToast = useToast((state) => state.setSuccessToast);

  const showConfirmation = useDialog((state) => state.showConfirmation);
  const setPages = usePaginationStore((state) => state.setPages);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const navigate = useNavigate();

  const handleUpdate = (id: number) => {
    if (!id) return;
    if (endpoints?.updateForm) {
      navigate(endpoints.updateForm + "&id=" + id);
    }
  };

  const handleDelete = (id: number) => {
    if (!id) return;
    showConfirmation(
      "Delete confirmation",
      "Are you sure you want to delete this row?",
      async () => {
        try {
          if (endpoints?.delete) {
            await api.delete(endpoints.delete + "/" + id);
          } else if (endpoints?.get) {
            await api.delete(endpoints?.get + "/" + id);
          } else {
            console.log("Set delete or get endpoint ");
            throw new Error();
          }
          setSuccessToast("Successfully deleted");
        } catch {
          setErrorToast("Something wrong happened");
        }
      },
    );
  };

  useEffect(() => {
    const formatJson = (str: string) => {
      try {
        const parsed = JSON.parse(str);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return str;
      }
    };

    const mapRows = (tableRows: T[]) => {
      if (!tableRows || !tableRows.length) {
        setBodyData(null);
        return;
      }
      const rowsData = tableRows.map((row, rowIndex) => {
        const rowData = cols.map((col, colIndex) => {
          let value = row[col.name] as any;

          if (value == null || value === "null" || value === "") {
            return <td></td>;
          }

          const cellKey = `cell-${rowIndex}-${colIndex}`;

          if (col.type == "date") {
            return (
              <td className="table-cell-wrap" key={cellKey}>
                {formatDate(value, col.dateType ?? "short")}
              </td>
            );
          }

          if (col.type == "image")
            return (
              <td key={cellKey}>
                <SingleImage image={{ src: value, alt: row[col.name] }} />
              </td>
            );

          if (col.type === "decimal") {
            return (
              <td key={cellKey} className="align-right">
                <div className="flexbox justify-end">
                  {col.numberCurrency ?? ""}
                  {Number(value).toFixed(2)}
                </div>
              </td>
            );
          }

          if (typeof value === "string") {
            const isJson = value.startsWith("{") && value.endsWith("}");
            if (isJson) {
              value = formatJson(value);
            }

            if (value.length > 40) {
              return (
                <td
                  className={"table-cell-wrap " + (isJson ? "text-left" : "")}
                  key={cellKey}
                >
                  <Tooltip title={value}>
                    <pre>{value.substring(0, 40)}...</pre>
                  </Tooltip>
                </td>
              );
            } else {
              return (
                <td
                  className={"table-cell-wrap " + (isJson ? "text-left" : "")}
                  key={cellKey}
                >
                  {row[col.name]}
                </td>
              );
            }
          }

          return (
            <td className={"table-cell-wrap"} key={cellKey}>
              {row[col.name]}
            </td>
          );
        });
        return (
          <tr key={rowIndex}>
            {restrictions.shouldRowNumberBeVisible && <td>{rowIndex + 1}</td>}
            {rowData}
            {isCrudTable &&
            (!restrictions.hideDelete ||
              !restrictions.hideUpdate ||
              customActions) ? (
              <td className="actions">
                <div className="flexcol align-end">
                  {!restrictions.hideUpdate && (
                    <Button
                      btnClass="light mb-2"
                      handleClickFunction={() => handleUpdate(row.id)}
                    >
                      <FontAwesomeIcon icon={"edit"} />
                    </Button>
                  )}
                  {!restrictions.hideDelete && (
                    <Button
                      btnClass="red"
                      handleClickFunction={() => handleDelete(row.id)}
                    >
                      <FontAwesomeIcon icon={"trash-alt"} />
                    </Button>
                  )}
                  {customActions && customActions(row)}
                </div>
              </td>
            ) : null}
          </tr>
        );
      });
      setBodyData(rowsData);
    };
    mapRows(tableRows);
  }, [tableRows]);

  useEffect(() => {
    const init = async () => {
      if (rows && rows.length) {
        setTableRows(rows);
        return;
      }

      if (endpoints?.get) {
        let cleanParams: any;
        if (filters) {
          cleanParams = makeCleanSearchParams(filters);
        }

        const requestParams = {
          ...cleanParams,
          page: currentPage,
          perPage: 24,
          paginate: true,
        };

        if (sorting) {
          requestParams.sorts = [sorting];
        }

        console.log(requestParams);

        const resp = await api.get(endpoints.get, {
          params: requestParams,
          paramsSerializer: {
            indexes: null,
          },
        });
        if (resp.status == 200) {
          let data: any = resp.data.items ?? resp.data;
          if (mapDataOnResponse) {
            data = mapDataOnResponse(resp.data.items);
          }
          setTableRows(data);
          if (resp.data.items) {
            setPages(resp.data.totalPages, resp.data.totalCount);
            setCurrentPage(1);
          }
        }
      }
    };
    init();
  }, [rows, endpoints?.get, filters, currentPage, sorting]);

  return (
    <div className="w-full">
      {title && (
        <span>
          <h2 className="font-12 bold">{title}</h2>
          <hr className="line" />
        </span>
      )}
      <div className="table-div w-full">
        {tableRows && tableRows.length ? (
          <>
            <table
              className={"generic-table " + (tableClass ? tableClass : "")}
            >
              <thead>
                <tr>
                  {restrictions.shouldRowNumberBeVisible && <th>#</th>}
                  {cols.map((x, ind) => (
                    <th key={ind}>
                      {String(
                        x.label
                          ? x.label
                          : String(x.name).charAt(0).toUpperCase() +
                              String(x.name).slice(1),
                      )}
                    </th>
                  ))}
                  {isCrudTable &&
                  (!restrictions.hideDelete ||
                    !restrictions.hideUpdate ||
                    customActions) ? (
                    <th className="actions">Actions</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>{bodyData}</tbody>
            </table>
          </>
        ) : (
          <h2 className="font-14 bold mt-20 back-light rounded shadow-dark px-10 py-4">
            No rows found
          </h2>
        )}
      </div>
      {shouldPaginate && tableRows && tableRows.length ? <Pagination /> : null}
    </div>
  );
};

export default GenericTable;
