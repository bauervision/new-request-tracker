import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Define types for props
interface AGGridProps {
  rows: any[];
  columns: any[];
  paginate?: boolean;
  setHeight: string;
}

export const AGGrid: React.FC<AGGridProps> = ({
  rows,
  columns,
  paginate,
  setHeight,
}) => {
  const [rowData, setRowData] = useState<any[]>(rows);
  const [colDefs, setColumnDefs] = useState<any[]>(columns);

  const defaultColDef = {
    initialWidth: 200,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: setHeight }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={paginate}
      />
    </div>
  );
};
