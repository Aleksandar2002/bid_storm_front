/* eslint-disable @typescript-eslint/no-explicit-any */
type TableProps<T> = {
  title: string;
  cols: Array<keyof T>;
  rows: Array<T>;
};

const GenericTable = <T extends Record<string, any>>({
  title,
  cols,
  rows,
}: TableProps<T>) => {
  const bodyData = rows.map((row) => {
    const rowData = cols.map((col) => <td>{row[col]}</td>);
    return <tr>{rowData}</tr>;
  });

  return (
    <>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {cols.map((x) => (
              <td>{String(x)}</td>
            ))}
          </tr>
        </thead>
        <tbody>{bodyData}</tbody>
      </table>
    </>
  );
};

export default GenericTable;
