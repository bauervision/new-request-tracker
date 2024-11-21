"use client";

import { CellEditingStoppedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useContext,
  useEffect,
} from "react";

import { rawCols } from "./data.js";
import { useRequestContext } from "@/app/context";
import { Skeleton } from "../ui/skeleton";

export interface RowData {
  order: number;
  price: number;
  product: string;
  shipped: boolean;
  delivery: Date;
  status: string;
}

export interface RowProps {
  rowData: RowData;
}

const GridTable = () => {
  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);

  const { data, selectedRow, addRow, updateRow, deleteRow, selectRow } =
    useRequestContext();

  const gridApiRef = useRef<any>(null); // <= defined useRef for gridApi

  const onGridReady = useCallback((params: any) => {
    gridApiRef.current = params.api;
    setGridApi(params.api);
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  const onSelectionChanged = () => {
    if (gridApiRef.current) {
      const selectedNodes = gridApiRef.current.getSelectedNodes();
      if (selectedNodes.length > 0) {
        selectRow(selectedNodes[0].data); // Use selectRow to update the selected row in context
        //console.log("Selected row:", JSON.stringify(selectedNodes[0].data));
      }
    } else {
      console.error("Grid API is not ready.");
    }
  };

  const handleSelectRow = (row: RowData) => {
    selectRow(row);
  };
  const handleAddRow = () => {
    console.log("Adding New Row!");
    // const newRow: RowData = {
    //   /* ... */
    // };
    // addRow(newRow);
  };
  const handleUpdateRow = (index: number) => {
    console.log("Updating Row index: " + index);
    // if (selectedRow) {
    //   const updatedRow: RowData = {
    //     /* ...update with necessary data... */
    //   };
    //   updateRow(index, updatedRow);
    // }
  };
  const handleDeleteRow = (index: number) => {
    deleteRow(index);
  };

  const handleCellEditingStopped = (params: CellEditingStoppedEvent) => {
    //console.log("Cell editing stopped:", params);
    const updatedRow = params.data;
    const rowIndex = params.node.rowIndex;
    if (rowIndex !== null && rowIndex !== undefined) {
      updateRow(rowIndex, updatedRow); // Update the row using the updateRow method
    } else {
      console.error("Row index is null or undefined.");
    }
  };

  return (
    <div
      className={"ag-theme-quartz mx-auto "}
      style={{ width: "90%", height: "500px" }}
    >
      {/* Show if data hasnt loaded */}
      {!data ? (
        <div className="flex justify-center items-center ">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        <AgGridReact
          rowData={data}
          columnDefs={rawCols}
          defaultColDef={defaultColDef}
          rowSelection="single" // Directly specify row selection
          onCellEditingStopped={handleCellEditingStopped} // Directly specify the event handler
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          onGridReady={onGridReady}
          ref={gridApiRef}
        />
      )}
    </div>
  );
};
export default GridTable;
