"use client";

import React, { useMemo, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useSchema } from "@/app/context/SchemaContext";
import { useRequestContext } from "@/app/context/DataContext";
import Link from "next/link";
import { Button } from "../ui/button";

const GridTable = () => {
  const { colDefs, rowData } = useSchema(); // Get colDefs and rowData from context
  const { selectRow } = useRequestContext(); // Access selectRow from RequestContext
  const gridApiRef = useRef<any>(null);

  const onGridReady = useCallback((params: any) => {
    gridApiRef.current = params.api;
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
        const selectedData = selectedNodes[0].data;
        selectRow(selectedData); // Set the selected row in the RequestContext
      }
    }
  };

  return (
    <div
      className="ag-theme-quartz mx-auto"
      style={{ width: "90%", height: "500px" }}
    >
      {!colDefs || !rowData ? (
        <div className="flex flex-col justify-center items-center h-full">
          <Link href="request-tracker/admin/data-management">
            <Button className="bg-blue-800 text-white">
              Set it your data in Data Management first!
            </Button>
          </Link>
        </div>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
          ref={gridApiRef}
        />
      )}
    </div>
  );
};

export default GridTable;
