"use client";

import React, { useState, useEffect } from "react";
import { useSchema } from "@/app/context/SchemaContext";
import { useWorkflow } from "@/app/context/WorkflowContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FIELD_TYPES } from "@/app/constants";
import Link from "next/link";
import { handleLinkClick } from "@/app/utils/trackLinkClicks";

const OrderRequestForm = () => {
  const { schema, rowData, setRowData } = useSchema();
  const {
    state,
    savedWorkflows,
    currentWorkflowName,
    setCurrentWorkflowName,
    loadWorkflow,
  } = useWorkflow();

  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState<string[]>([]);

  // Handle workflow selection
  const handleWorkflowChange = (workflowName: string) => {
    setCurrentWorkflowName(workflowName);
    loadWorkflow(workflowName);

    // Extract steps from the workflow state
    if (state.rootItem) {
      const steps = extractWorkflowSteps(state.rootItem);
      setWorkflowSteps(steps);
    } else {
      setWorkflowSteps([]);
    }
  };

  // Extract workflow steps recursively
  const extractWorkflowSteps = (
    itemId: string,
    steps: string[] = []
  ): string[] => {
    const item = state.items[itemId];
    if (!item) return steps;

    steps.push(item.name); // Add the current item's name

    // Recursively process children
    item.children.forEach((childId) => extractWorkflowSteps(childId, steps));
    return steps;
  };

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!schema) {
      console.error("No schema found.");
      return;
    }

    if (!currentWorkflowName) {
      console.error("No workflow selected.");
      return;
    }

    const newRow = {
      ...formValues,
      id: rowData ? rowData.length + 1 : 1, // Generate a new ID
      workflow: currentWorkflowName, // Add selected workflow to the order
    };

    if (setRowData) {
      setRowData([...(rowData || []), newRow]); // Add the new row to context
    }

    setFormValues({}); // Clear form
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000); // Reset submission message after 3 seconds
  };

  if (!schema) {
    return (
      <p className="text-red-500">
        Schema is not available. Please set it up first.
      </p>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Create New Order Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Workflow Selector */}
        {savedWorkflows.length > 0 ? (
          <div className="space-y-2">
            <Label htmlFor="workflow" className="font-medium text-sm">
              Select Workflow
            </Label>
            <Select
              onValueChange={handleWorkflowChange}
              value={currentWorkflowName || ""} // Default to empty string
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a workflow" />
              </SelectTrigger>
              <SelectContent>
                {/* Default "Select a Workflow" option */}
                <SelectItem value="" disabled>
                  Select a Workflow
                </SelectItem>
                {savedWorkflows.map((workflowName) => (
                  <SelectItem key={workflowName} value={workflowName}>
                    {workflowName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Workflow Steps Preview */}
            {workflowSteps.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h3 className="font-medium text-sm mb-2">
                  Steps in Selected Workflow:
                </h3>
                <ul className="list-disc pl-5">
                  {workflowSteps.map((step, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/request-tracker/workflow"
            passHref
            onClick={() => handleLinkClick("/request-tracker/workflow")}
          >
            <Button
              asChild
              className="bg-blue-800 text-white"
              variant={"outline"}
            >
              <p>Workflows not available, set one up first.</p>
            </Button>
          </Link>
        )}

        {/* Dynamic Form Fields */}
        {schema.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.parameter} className="font-medium text-sm">
              {field.parameter}
            </Label>
            {field.type === FIELD_TYPES.TEXT && (
              <Input
                type="text"
                id={field.parameter}
                value={formValues[field.parameter] || ""}
                onChange={(e) =>
                  handleInputChange(field.parameter, e.target.value)
                }
                placeholder={`Enter ${field.parameter}`}
              />
            )}
            {/* Additional field types */}
          </div>
        ))}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>

      {formSubmitted && (
        <p className="text-green-500 mt-4">
          Order request successfully submitted!
        </p>
      )}
    </div>
  );
};

export default OrderRequestForm;
