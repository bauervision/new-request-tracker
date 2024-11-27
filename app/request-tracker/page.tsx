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
import { handleLinkClick, trackLinkClick } from "../utils/trackLinkClicks";

function RequestPage() {
  const { selectedRow } = useRequestContext();

  return (
    <RequestsLayout>
      <Card className="w-full mx-6">
        <CardHeader>
          <div className="flex flex-row space-x-6 justify-between">
            <div className="">
              {/* <CardTitle className="pb-3">Requests</CardTitle> */}

              {/* Request Buttons */}
              <RequestDrawer />
              {selectedRow && <RequestDialog />}
            </div>

            <div className="">
              {/* <CardTitle className="pb-3">Workflows</CardTitle> */}
              {/* Workflow Buttons */}
              <Link href="/request-tracker/workflow">
                <Button
                  variant="outline"
                  className="bg-blue-800 text-white"
                  onClick={() => handleLinkClick("/request-tracker/workflow")}
                >
                  View Workflows
                </Button>
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
