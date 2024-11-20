"use client";

import { RowData } from "@/components/ag-grid-table/GridTable";
import { Children, createContext, useContext, useState } from "react";

interface RequestContextType {
  data: RowData[];
  selectedRow: RowData | null;
  setRowData: (data: RowData[]) => void;
  selectRow: (row: RowData) => void;
  addRow: (row: RowData) => void;
  updateRow: (index: number, row: RowData) => void;
  deleteRow: (index: number) => void;
}

const RequestContext = createContext<RequestContextType>({
  data: [],
  selectedRow: null,
  setRowData: () => {},
  selectRow: () => {},
  addRow: () => {},
  updateRow: () => {},
  deleteRow: () => {},
});

export const RequestProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [data, setRowData] = useState<RowData[]>([]);
  const addRow = (row: RowData) => {
    setRowData((prevData) => [...prevData, row]);
  };
  const updateRow = (index: number, updatedRow: RowData) => {
    setRowData((prevData) =>
      prevData.map((row, i) => (i === index ? updatedRow : row))
    );
  };
  const deleteRow = (index: number) => {
    setRowData((prevData) => prevData.filter((_, i) => i !== index));
  };
  return (
    <RequestContext.Provider
      value={{ data, setRowData, addRow, updateRow, deleteRow }}
    >
      {children}
    </RequestContext.Provider>
  );
};
export const useRequestContext = () => useContext(RequestContext);
