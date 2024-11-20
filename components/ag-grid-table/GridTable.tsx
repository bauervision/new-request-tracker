"use client";

import { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";

import { rawData, rawCols } from "./data.js";
import { useRequestContext } from "@/app/context";

export interface RowData {
  order: number;
  price: number;
  product: string;
  shipped: boolean;
  delivery: Date;
}

export interface RowProps {
  rowData: RowData;
}

const GridTable = () => {
  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);

  const { data, addRow, updateRow, deleteRow } = useRequestContext();

  const gridApiRef = useRef<any>(null); // <= defined useRef for gridApi

  const onGridReady = useCallback((params: any) => {
    gridApiRef.current = params.api;
    setGridApi(params.api);
  }, []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>(rawCols);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  const onSelectionChanged = () => {
    const selectedRow = gridApiRef.current.getSelectedRows();
    console.log("Selected row:", JSON.stringify(selectedRow[0]));
    requestData.setRowData(selectedRow[0]);
  };

  const [dateData, setDateData] = useState([{ delivery: new Date() }]);

  const handleCellEditingStopped = (params: any) => {
    console.log("Cell editing stopped:", params);
    const newValue = params.newValue;
    console.log("New Value:", newValue);
  };

  const gridOptions = {
    rowSelection: "single", // or 'multi-row' for multiple selection
    onCellEditingStopped: (params: any) => {
      console.log("Cell editing stopped:", params);
      const newValue = params.newValue;
      console.log("New Value:", newValue);
    },
  };

  return (
    <div
      className={"ag-theme-quartz mx-auto"}
      style={{ width: "80%", height: "500px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="single" // Directly specify row selection
        onCellEditingStopped={handleCellEditingStopped} // Directly specify the event handler
        onSelectionChanged={onSelectionChanged}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        onGridReady={onGridReady}
        ref={gridApiRef}
        // onCellValueChanged={onCellValueChanged}
        //onCellEditingStopped={handleCellEditingStopped}
      />
    </div>
  );
};
export default GridTable;
