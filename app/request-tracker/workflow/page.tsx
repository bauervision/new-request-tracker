import WorkflowEditor from "@/components/Workflows/workflow-editor";
import RequestsLayout from "@/app/request-tracker/RequestsLayout";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListItem } from "./WorkflowItem";

function Workflows() {
  const initialItems: ListItem[] = [];
  return (
    <RequestsLayout>
      <Card className="w-full mx-6">
        <CardHeader>
          <div className="flex flex-row space-x-6 justify-between">
            <div className="">
              <CardTitle>Catēna Workflow Management</CardTitle>
              <CardDescription>View and Update your Workflow</CardDescription>
            </div>

            <div className="">
              <Link href="/request-tracker">
                <Button variant="outline">View Requests</Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-row space-x-5"></div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-1">
            <div className="gap-4 p-8 requestBG pb-20">
              <Card>
                <WorkflowEditor initialItems={initialItems} />
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </RequestsLayout>
  );
}

export default Workflows;
