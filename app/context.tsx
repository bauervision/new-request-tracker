"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { RowData } from "@/components/ag-grid-table/GridTable";
import { rawData } from "@/components/ag-grid-table/data";

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
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  // Load initial data
  useEffect(() => {
    const initialData: RowData[] = rawData;
    setRowData(initialData);
  }, []);

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

  const selectRow = (row: RowData) => {
    setSelectedRow(row);
  };

  return (
    <RequestContext.Provider
      value={{
        data,
        selectedRow,
        setRowData,
        addRow,
        updateRow,
        deleteRow,
        selectRow,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => useContext(RequestContext);
