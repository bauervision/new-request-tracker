"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedSchema = localStorage.getItem(SCHEMA_STORAGE_KEY);
    const savedRowData = localStorage.getItem(ROW_DATA_STORAGE_KEY);
    const savedColDefs = localStorage.getItem(COL_DEFS_STORAGE_KEY);

    if (savedSchema) setSchemaState(JSON.parse(savedSchema));
    if (savedRowData) setRowDataState(JSON.parse(savedRowData));
    if (savedColDefs) setColDefsState(JSON.parse(savedColDefs));
  }, []);

  // Save to localStorage whenever state changes
  const setSchema = (newSchema: Schema | null) => {
    setSchemaState(newSchema);
    if (newSchema)
      localStorage.setItem(SCHEMA_STORAGE_KEY, JSON.stringify(newSchema));
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

  // Method to clear all local data
  const clearLocalData = () => {
    localStorage.removeItem(SCHEMA_STORAGE_KEY);
    localStorage.removeItem(ROW_DATA_STORAGE_KEY);
    localStorage.removeItem(COL_DEFS_STORAGE_KEY);
    setSchemaState(null);
    setRowDataState(null);
    setColDefsState(null);
    console.log("Local data cleared.");
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
