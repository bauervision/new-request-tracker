"use client";

import GridTable from "@/components/ag-grid-table/GridTable";
import { RequestDialog } from "@/components/Requests/RequestDialog";
import { RequestDrawer } from "@/components/Requests/RequestDrawer";

import React from "react";

import { useRequestContext } from "../context/DataContext";

import RequestsLayout from "./RequestsLayout";
import TaskSheet from "@/components/TaskSheet";
import { Button } from "@/components/ui/button";
import { handleLinkClick } from "../utils/trackLinkClicks";
import Link from "next/link";

function RequestPage() {
  const { selectedRow } = useRequestContext();

  return (
    <RequestsLayout
      title="Requests"
      pageComponents={[
        <Link
          href="/request-tracker/new-request"
          passHref
          onClick={() => handleLinkClick("/request-tracker/new-request")}
        >
          <Button
            asChild
            className="bg-blue-800 text-white"
            variant={"outline"}
          >
            <a>New Request</a>
          </Button>
        </Link>,
        selectedRow && <RequestDialog />,
        <TaskSheet />,
      ]}
    >
      <GridTable />
    </RequestsLayout>
  );
}

export default RequestPage;
