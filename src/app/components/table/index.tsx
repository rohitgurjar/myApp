import React from "react";

type TableProps = {
  heading: { header: string; key: string }[];
  data: Array<{ [key: string]: React.ReactNode }>;
  onRowClick?: (rowData: any) => void;
  loading: boolean;
};

const Table: React.FC<TableProps> = ({
  heading,
  data,
  onRowClick,
  loading,
}) => {
  const handleRowClick = (rowData: any) => {
    if (onRowClick) onRowClick(rowData);
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {heading?.map((heading, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left border-b font-semibold"
              >
                {heading.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((rowData, index) => (
            <tr key={index} onClick={() => handleRowClick(rowData)}>
              {Object.keys(rowData)?.map((key, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border-b">
                  {rowData[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
