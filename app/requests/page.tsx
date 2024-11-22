"use client";

import GridTable, { RowData } from "@/components/ag-grid-table/GridTable";
import { RequestDialog } from "@/components/Requests/RequestDialog";
import { RequestDrawer } from "@/components/Requests/RequestDrawer";

import React, { useState, useContext, createContext } from "react";

import { useRequestContext } from "../context";
import RequestTrackerNavBar from "./RequestTrackerNavBar";
import { RequestTabs } from "./RequestTabs";

function RequestPage() {
  return (
    <div>
      <RequestTabs />
    </div>
  );
}

export default RequestPage;
