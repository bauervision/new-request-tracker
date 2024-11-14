"use client";

import { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useMemo, useState, useCallback, useRef } from "react";
import { RequestDialog } from "@/components/ag-grid-table/RequestDialog";

import { rawData, rawCols } from "./data.js";
import { Button } from "@/components/ui/button";
import { RequestDrawer } from "./RequestDrawer";

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  headerCheckbox: false,
};

export interface RowData {
  order: number;
  price: number;
  product: string;
  shipped: boolean;
  month: string;
}

export interface RowProps {
  rowData: RowData;
}

const GridTable = () => {
  const [rowData, setRowData] = useState(rawData);
  const [gridApi, setGridApi] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState();
  const [showNewDialog, setShowNewDialog] = useState(false);

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
    setSelectedRequest(selectedRow[0]);
  };

  const handleShowNewRequest = () => {
    console.log("Show New Request");
    setShowNewDialog(!showNewDialog);
  };

  return (
    <div
      className={"ag-theme-quartz mx-auto"}
      style={{ width: "80%", height: "500px" }}
    >
      <div className=" container flex flex-row justify-center items-center flex-wrap gap-4 py-2">
        <RequestDrawer />
        {selectedRequest && <RequestDialog rowData={selectedRequest} />}
      </div>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="single"
        onSelectionChanged={onSelectionChanged}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        onGridReady={onGridReady}
        ref={gridApiRef}
      />
    </div>
  );
};
export default GridTable;
