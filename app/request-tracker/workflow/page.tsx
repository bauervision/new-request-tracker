"use client";

import WorkflowEditor from "@/components/Workflows/workflow-editor";
import RequestsLayout from "@/app/request-tracker/RequestsLayout";
import React from "react";

import { ListItem } from "./WorkflowItem";

function Workflows() {
  const initialItems: ListItem[] = [];
  return (
    <RequestsLayout title="Catēna Workflow Management">
      <WorkflowEditor initialItems={initialItems} />
    </RequestsLayout>
  );
}

export default Workflows;
