"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useSchema } from "@/app/context/SchemaContext";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { handleLinkClick } from "@/app/utils/trackLinkClicks";
import { Button } from "../ui/button";

const GridTable = () => {
  const { colDefs, rowData } = useSchema(); // Pull colDefs and rowData from context
  const [gridApi, setGridApi] = useState(null);
  const gridApiRef = useRef<any>(null);

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
        console.log("Selected row:", JSON.stringify(selectedNodes[0].data));
      }
    } else {
      console.error("Grid API is not ready.");
    }
  };

  return (
    <div
      className={"ag-theme-quartz mx-auto"}
      style={{ width: "90%", height: "500px" }}
    >
      {/* Show message if no data is available */}
      {!colDefs || !rowData ? (
        <div className="flex flex-col justify-center items-center h-full">
          <Link
            href="request-tracker/admin/data-management"
            passHref
            onClick={() =>
              handleLinkClick("request-tracker/admin/data-management")
            }
          >
            <Button
              asChild
              className="bg-blue-800 text-white"
              variant={"outline"}
            >
              No data found. Please ensure schema and row data are saved here.
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
