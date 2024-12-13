"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
  ShadcnToastProps,
} from "@/components/ui/toast";

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

/// TOAST

interface ToastContextProps {
  addToast: (toast: ShadcnToastProps) => number;
  updateToast: (id: number, updatedToast: Partial<ShadcnToastProps>) => void;
}
interface ToastProviderProps {
  children: ReactNode;
}
const ToastContext = createContext<ToastContextProps | undefined>(undefined);
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return context;
};
export const ToastContextProvider: React.FC<ToastProviderProps> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ShadcnToastProps[]>([]);
  const addToast = (toast: ShadcnToastProps) => {
    console.log("Adding toast:", toast);
    setToasts((prevToasts) => [...prevToasts, toast]);
    return toasts.length; // Returning the index as the ID
  };
  const updateToast = (id: number, updatedToast: Partial<ShadcnToastProps>) => {
    console.log("Updating toast:", id, updatedToast);
    setToasts((prevToasts) =>
      prevToasts.map((toast, index) =>
        index === id ? { ...toast, ...updatedToast } : toast
      )
    );
  };
  return (
    <ToastContext.Provider value={{ addToast, updateToast }}>
      {children}
      <ToastProvider>
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            variant={toast.variant}
            title={toast.title} //missing
            description={toast.description} //missing
          >
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
};
