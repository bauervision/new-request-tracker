import React from "react";
import RequestsLayout from "../RequestsLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ManagementPage() {
  return (
    <RequestsLayout>
      <Card className="w-full mx-6">
        <CardHeader>
          <div className="flex flex-row space-x-6 justify-between">
            <div className="">
              <CardTitle>Catēna Program Management</CardTitle>
              <CardDescription>All Administrative Options</CardDescription>
              {/* Request Buttons */}
            </div>

            <div className="">
              <CardTitle>Workflows</CardTitle>
              <CardDescription>View and Edit Workflows</CardDescription>

              {/* Workflow Buttons */}
              <Button variant="outline">View Workflows</Button>
              <Button variant="outline">Workflow Editor</Button>
            </div>
          </div>
          <div className="flex flex-row space-x-5"></div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-1">
            <div className="gap-4 py-8 requestBG pb-20">Admin Data</div>
          </div>
        </CardContent>
      </Card>
    </RequestsLayout>
  );
}

export default ManagementPage;
