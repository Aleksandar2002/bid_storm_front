import { formatDate } from "../../utils/dateHelper";
import SingleImage from "../media/SingleImage";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TableProps<T> = {
  title?: string;
  cols: Array<TableColumn<T>>;
  rows: Array<T>;
  tableClass?: string;
};

export type TableColumn<T> = {
  name: keyof T;
  type: "image" | "text" | "date" | "decimal";
  label: string;
  dateType?: "short" | "long";
  numberCurrency?: string;
};

const GenericTable = <T extends Record<string, any>>({
  title,
  cols,
  rows,
  tableClass,
}: TableProps<T>) => {
  const bodyData = rows.map((row, ind) => {
    const rowData = cols.map((col) => {
      if (col.type == "text") return <td>{row[col.name]}</td>;
      if (col.type == "date")
        return <td>{formatDate(row[col.name], col.dateType ?? "short")}</td>;

      if (col.type == "image")
        return (
          <td>
            <SingleImage image={{ src: row[col.name], alt: row[col.name] }} />
          </td>
        );

      if (col.type === "decimal") {
        const value = row[col.name];
        return (
          <td className="align-right">
            <div className="flexbox justify-end">
              {col.numberCurrency ?? ""}
              {Number(value).toFixed(2)}
            </div>
          </td>
        );
      }
    });
    return (
      <tr>
        <td>{ind + 1}</td>
        {rowData}
      </tr>
    );
  });

  return (
    <>
      {title && <h2>{title}</h2>}
      <table className={"generic-table " + (tableClass ? tableClass : "")}>
        <thead>
          <tr>
            <th>#</th>
            {cols.map((x) => (
              <th>{String(x.label)}</th>
            ))}
          </tr>
        </thead>
        <tbody>{bodyData}</tbody>
      </table>
    </>
  );
};

export default GenericTable;
