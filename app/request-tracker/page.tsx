"use client";

import GridTable, { RowData } from "@/components/ag-grid-table/GridTable";
import { RequestDialog } from "@/components/Requests/RequestDialog";
import { RequestDrawer } from "@/components/Requests/RequestDrawer";

import React, { useState, useContext, createContext } from "react";

import { useRequestContext } from "../context";
import RequestTrackerNavBar from "./RequestTrackerNavBar";
import { RequestTabs } from "./RequestTabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RequestsLayout from "./RequestsLayout";
import Link from "next/link";

function RequestPage() {
  const { selectedRow } = useRequestContext();

  return (
    <RequestsLayout>
      <Card className="w-full mx-6">
        <CardHeader>
          <div className="flex flex-row space-x-6 justify-between">
            <div className="">
              <CardTitle>Requests</CardTitle>
              <CardDescription>Request and Order Tracking</CardDescription>
              {/* Request Buttons */}
              <RequestDrawer />
              {selectedRow && <RequestDialog />}
            </div>

            <div className="">
              <CardTitle>Workflows</CardTitle>
              <CardDescription>View and Edit Workflows</CardDescription>

              {/* Workflow Buttons */}
              <Link href="/request-tracker/workflow">
                <Button variant="outline">View Workflows</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-row space-x-5"></div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-1">
            <div className="gap-4 py-8 requestBG pb-20">
              <GridTable />
            </div>
          </div>
        </CardContent>
      </Card>
    </RequestsLayout>
  );
}

export default RequestPage;
