"use client";

import GridTable from "@/components/ag-grid-table/GridTable";
import { RequestDialog } from "@/components/Requests/RequestDialog";
import { RequestDrawer } from "@/components/Requests/RequestDrawer";

import React from "react";

import { useRequestContext } from "../context";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RequestsLayout from "./RequestsLayout";
import Link from "next/link";
import { handleLinkClick } from "../utils/trackLinkClicks";
import TaskSheet from "@/components/TaskSheet";

function RequestPage() {
  const { selectedRow } = useRequestContext();

  return (
    <RequestsLayout>
      <Card className="w-full mx-6">
        <CardHeader>
          <div className="flex flex-row  items-center justify-between ">
            {/* Request Button and View Request */}
            <div>
              <div className="flex flex-col  ">
                <div>
                  <RequestDrawer />
                </div>

                <Link href="/request-tracker/deliverables">
                  <Button
                    variant="outline"
                    className="bg-blue-800 text-white"
                    onClick={() =>
                      handleLinkClick("/request-tracker/deliverables")
                    }
                  >
                    Deliverables
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <TaskSheet />
              {selectedRow && <RequestDialog />}
            </div>

            {/* Workflow Button */}
            <div className="flex flex-col  ">
              <Link href="/request-tracker/workflow">
                <Button
                  variant="outline"
                  className="bg-blue-800 text-white"
                  onClick={() => handleLinkClick("/request-tracker/workflow")}
                >
                  Workflows
                </Button>
              </Link>
              <Link href="/request-tracker/shipments">
                <Button
                  variant="outline"
                  className="bg-blue-800 text-white"
                  onClick={() => handleLinkClick("/request-tracker/shipments")}
                >
                  Shipments
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
