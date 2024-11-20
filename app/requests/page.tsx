"use client";

import GridTable, { RowData } from "@/components/ag-grid-table/GridTable";
import { RequestDialog } from "@/components/Requests/RequestDialog";
import { RequestDrawer } from "@/components/Requests/RequestDrawer";

import React, { useState, useContext, createContext } from "react";

import { RequestContext } from "../context";

function RequestPage() {
  const requestData = useContext(RequestContext);

  return (
    <div className="bg-slate-300">
      <div className="gradientBG py-4 text-white">
        <h1 className="boldText">Request Tracker</h1>
      </div>

      <div className=" container flex flex-row justify-center items-center flex-wrap gap-4 py-2">
        <RequestDrawer />
        {requestData.data && <RequestDialog />}
      </div>

      <div className="gap-4 py-8 requestBG pb-20">
        <GridTable />
      </div>
    </div>
  );
}

export default RequestPage;
