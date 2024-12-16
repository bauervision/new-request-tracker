"use client";

import GridTable from "@/components/ag-grid-table/GridTable";
import { RequestDialog } from "@/components/Requests/RequestDialog";
import { RequestDrawer } from "@/components/Requests/RequestDrawer";

import React from "react";

import { useRequestContext } from "../context/DataContext";

import RequestsLayout from "./RequestsLayout";
import TaskSheet from "@/components/TaskSheet";

function RequestPage() {
  const { selectedRow } = useRequestContext();

  return (
    <RequestsLayout
      title="Requests"
      pageComponents={[
        <RequestDrawer />,
        selectedRow && <RequestDialog />,
        <TaskSheet />,
      ]}
    >
      <GridTable />
    </RequestsLayout>
  );
}

export default RequestPage;
