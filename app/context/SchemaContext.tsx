"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useWorkflow } from "@/app/context/WorkflowContext";

// Define SchemaItem and other types
export interface SchemaItem {
  id: number;
  type: string;
  parameter: string;
}

export type Schema = SchemaItem[];

export interface ColDef {
  field: string;
  [key: string]: any;
}

export interface SchemaContextType {
  schema: Schema | null;
  setSchema: (schema: Schema | null) => void;
  rowData: any[] | null;
  setRowData: (data: any[] | null) => void;
  colDefs: ColDef[] | null;
  setColDefs: (defs: ColDef[] | null) => void;
  clearLocalData: () => void;
  getRequestStatus: (workflowName: string) => number | null;
}

const SCHEMA_STORAGE_KEY = "schema_data";
const ROW_DATA_STORAGE_KEY = "row_data";
const COL_DEFS_STORAGE_KEY = "col_defs";

const SchemaContext = createContext<SchemaContextType | undefined>(undefined);

export const SchemaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [schema, setSchemaState] = useState<Schema | null>(null);
  const [rowData, setRowDataState] = useState<any[] | null>(null);
  const [colDefs, setColDefsState] = useState<ColDef[] | null>(null);

  const { state: workflowState, currentWorkflowName } = useWorkflow();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedSchema = localStorage.getItem(SCHEMA_STORAGE_KEY);
    const savedRowData = localStorage.getItem(ROW_DATA_STORAGE_KEY);
    const savedColDefs = localStorage.getItem(COL_DEFS_STORAGE_KEY);

    if (savedSchema) {
      const parsedSchema = JSON.parse(savedSchema);
      setSchemaState(parsedSchema);

      // Generate colDefs from schema
      const updatedColDefs = parsedSchema.map((item: SchemaItem) => ({
        field: item.parameter || "",
        filter:
          item.type === "DATE"
            ? "agDateColumnFilter"
            : item.type === "NUMBER" ||
              item.type === "FLOAT" ||
              item.type === "CURRENCY"
            ? "agNumberColumnFilter"
            : "agTextColumnFilter",
      }));
      setColDefsState(updatedColDefs);
    }

    if (savedRowData) {
      setRowDataState(JSON.parse(savedRowData));
    }

    if (savedColDefs) {
      setColDefsState(JSON.parse(savedColDefs));
    }
  }, []);

  // Add the "Request Status" field to the schema
  const addRequestStatusField = (currentSchema: Schema | null): Schema => {
    const requestStatusField: SchemaItem = {
      id: Date.now(), // Generate a unique ID
      type: "NUMBER", // Always interpret as a number
      parameter: "Request Status", // Field name
    };

    // Ensure "Request Status" is not already in the schema
    const existingField = currentSchema?.find(
      (field) => field.parameter === "Request Status"
    );

    if (!existingField) {
      return [...(currentSchema || []), requestStatusField];
    }
    return currentSchema || [];
  };

  // Save to localStorage whenever state changes
  const setSchema = (newSchema: Schema | null) => {
    // Add the "Request Status" field
    const updatedSchema = addRequestStatusField(newSchema);
    setSchemaState(updatedSchema);

    if (updatedSchema)
      localStorage.setItem(SCHEMA_STORAGE_KEY, JSON.stringify(updatedSchema));
    else localStorage.removeItem(SCHEMA_STORAGE_KEY);
  };

  const setRowData = (data: any[] | null) => {
    setRowDataState(data);
    if (data) localStorage.setItem(ROW_DATA_STORAGE_KEY, JSON.stringify(data));
    else localStorage.removeItem(ROW_DATA_STORAGE_KEY);
  };

  const setColDefs = (defs: ColDef[] | null) => {
    setColDefsState(defs);
    if (defs) localStorage.setItem(COL_DEFS_STORAGE_KEY, JSON.stringify(defs));
    else localStorage.removeItem(COL_DEFS_STORAGE_KEY);
  };

  const clearLocalData = () => {
    localStorage.removeItem(SCHEMA_STORAGE_KEY);
    localStorage.removeItem(ROW_DATA_STORAGE_KEY);
    localStorage.removeItem(COL_DEFS_STORAGE_KEY);
    setSchemaState(null);
    setRowDataState(null);
    setColDefsState(null);
    console.log("Local data cleared.");
  };

  // Dynamically fetch the Request Status from the workflow
  const getRequestStatus = (workflowName: string): number | null => {
    if (!workflowState || !workflowState.items || !workflowState.rootItem) {
      return null;
    }

    const rootItem = workflowState.items[workflowState.rootItem];
    if (!rootItem) return null;

    // Find the index of the current workflow name
    const steps = extractWorkflowSteps(workflowState.rootItem);
    const statusIndex = steps.findIndex((step) => step === workflowName);
    return statusIndex !== -1 ? statusIndex : null;
  };

  // Recursive helper to extract workflow steps
  const extractWorkflowSteps = (
    itemId: string,
    steps: string[] = []
  ): string[] => {
    const item = workflowState.items[itemId];
    if (!item) return steps;

    steps.push(item.name); // Add the current item's name

    // Recursively process children
    item.children.forEach((childId) => extractWorkflowSteps(childId, steps));
    return steps;
  };

  return (
    <SchemaContext.Provider
      value={{
        schema,
        setSchema,
        rowData,
        setRowData,
        colDefs,
        setColDefs,
        clearLocalData,
        getRequestStatus,
      }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

export const useSchema = () => {
  const context = useContext(SchemaContext);
  if (!context) {
    throw new Error("useSchema must be used within a SchemaProvider");
  }
  return context;
};
