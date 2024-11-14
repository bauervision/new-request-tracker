import GridTable from "@/components/ag-grid-table/GridTable";

import React from "react";

function RequestPage() {
  return (
    <div className="bg-slate-300">
      <div className="gradientBG py-4 text-white">
        <h1 className="boldText">Request Tracker</h1>
      </div>

      <div className="gap-4 py-8 requestBG">
        <GridTable />
      </div>
    </div>
  );
}

export default RequestPage;
