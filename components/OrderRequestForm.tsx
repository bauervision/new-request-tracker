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
import { PRESET_FIELDS } from "@/app/constants";
import Link from "next/link";
import { handleLinkClick } from "@/app/utils/trackLinkClicks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

const DATE_FORMATS: { [key: string]: string } = {
  "MM/DD/YYYY": "MM/dd/yyyy",
  "DD/MM/YYYY": "dd/MM/yyyy",
  "YYYY-MM-DD": "yyyy-MM-dd",
  "MMM DD, YYYY": "MMM dd, yyyy",
  "MM-DD-YYYY": "MM-dd-yyyy",
};

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

    steps.push(item.name);
    item.children.forEach((childId) => extractWorkflowSteps(childId, steps));
    return steps;
  };

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Date Picker Changes
  const handleDateChange = (
    field: string,
    date: Date | null,
    formatStr: string
  ) => {
    if (!date) return;
    const formattedDate = format(date, formatStr);
    setFormValues((prev) => ({ ...prev, [field]: formattedDate }));
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
      id: rowData ? rowData.length + 1 : 1,
      workflow: currentWorkflowName,
    };

    if (setRowData) {
      setRowData([...(rowData || []), newRow]);
    }

    setFormValues({});
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  if (!schema) {
    return (
      <p className="text-red-500">
        Schema is not available. Please set it up first.
      </p>
    );
  }

  // Ensure DATE fields in PRESET_FIELDS render DatePicker correctly
  const isDateField = (field: { type: string }) =>
    field.type.toUpperCase() === FIELD_TYPES.DATE.toUpperCase();

  const getDateFormat = (field: { format?: string }) =>
    DATE_FORMATS[field.format ?? "YYYY-MM-DD"];

  // Get today's date in the correct format
  const getFormattedTodayDate = (formatStr: string) => {
    return format(new Date(), DATE_FORMATS[formatStr] || "yyyy-MM-dd");
  };

  // On form load, set default values
  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      "Request Created": getFormattedTodayDate("MM-DD-YYYY"), // ✅ Match PRESET_FIELDS format
    }));
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Create New Order Request</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Workflow Selector */}
        {savedWorkflows.length > 0 ? (
          <div className="space-y-2">
            <Label htmlFor="workflow" className="font-medium text-sm">
              Select Workflow
            </Label>
            <Select
              onValueChange={handleWorkflowChange}
              value={currentWorkflowName || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a workflow" />
              </SelectTrigger>
              <SelectContent>
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
              variant="outline"
            >
              <p>Workflows not available, set one up first.</p>
            </Button>
          </Link>
        )}

        {/* Request Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Request Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
            {/* Core Fields */}
            {PRESET_FIELDS.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label
                  htmlFor={field.parameter}
                  className="font-medium text-sm"
                >
                  {field.parameter}
                </Label>

                {/* ✅ Read-only input for "Request Created" */}
                {field.parameter === "Request Created" ? (
                  <Input
                    type="text"
                    id={field.parameter}
                    value={formValues[field.parameter]}
                    readOnly
                    className="w-full border rounded-md px-2 py-2 text-sm bg-gray-100 cursor-not-allowed"
                  />
                ) : field.type.toUpperCase() ===
                  FIELD_TYPES.DATE.toUpperCase() ? (
                  <DatePicker
                    selected={
                      formValues[field.parameter] &&
                      typeof formValues[field.parameter] === "string"
                        ? parse(
                            formValues[field.parameter],
                            DATE_FORMATS[field.format ?? "YYYY-MM-DD"], // ✅ Ensure valid format
                            new Date()
                          )
                        : null
                    }
                    onChange={(date) =>
                      handleDateChange(
                        field.parameter,
                        date,
                        DATE_FORMATS[field.format ?? "YYYY-MM-DD"] // ✅ Default format fallback
                      )
                    }
                    dateFormat={DATE_FORMATS[field.format ?? "YYYY-MM-DD"]} // ✅ Use correct format
                    className="w-full border rounded-md px-2 py-2 text-sm"
                  />
                ) : (
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
              </div>
            ))}
          </div>
        </div>

        {/* User-Generated Fields */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Additional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
            {schema
              .filter((field) => field.parameter !== "Request Status")
              .map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label
                    htmlFor={field.parameter}
                    className="font-medium text-sm"
                  >
                    {field.parameter}
                  </Label>
                  {field.type === FIELD_TYPES.DATE ? (
                    <DatePicker
                      selected={
                        formValues[field.parameter] &&
                        typeof formValues[field.parameter] === "string"
                          ? parse(
                              formValues[field.parameter],
                              DATE_FORMATS[field.format ?? "YYYY-MM-DD"],
                              new Date()
                            )
                          : null
                      }
                      onChange={(date) =>
                        handleDateChange(
                          field.parameter,
                          date,
                          DATE_FORMATS[field.format ?? "YYYY-MM-DD"]
                        )
                      }
                      dateFormat={DATE_FORMATS[field.format ?? "YYYY-MM-DD"]}
                      className="w-full border rounded-md px-2 py-2 text-sm"
                    />
                  ) : (
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
                </div>
              ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default OrderRequestForm;
