"use client";

import React, { useEffect } from "react";
import { ColDef } from "ag-grid-community";

import { SchemaContent } from "./SchemaContent";
import { CSVParser } from "./CSVParser";
import { AGGrid } from "./AGGrid";
import { useSchema } from "@/app/context/SchemaContext";
import { FIELD_TYPES } from "@/app/constants";

interface DataSetupProps {
  myData?: {
    id: string;
    data?: any[];
    headers?: any[];
    schema?: SchemaItem[];
  } | null;
}

interface SchemaItem {
  id: number;
  type: string;
  parameter: string;
}

interface StrictColDef extends Omit<ColDef<any, any>, "field"> {
  field: string; // Ensure the field is strictly a string
}

const DataSetup: React.FC<DataSetupProps> = ({ myData }) => {
  const {
    schema,
    setSchema,
    rowData,
    setRowData,
    colDefs,
    setColDefs,
    clearLocalData,
  } = useSchema();

  useEffect(() => {
    if (schema && schema.length > 0) {
      const updatedColDefs = schema.map((item) => {
        const colDef: StrictColDef = {
          field: item.parameter || "",
          filter:
            item.type === FIELD_TYPES.DATE
              ? "agDateColumnFilter"
              : item.type === FIELD_TYPES.NUMBER ||
                item.type === FIELD_TYPES.FLOAT ||
                item.type === FIELD_TYPES.CURRENCY
              ? "agNumberColumnFilter"
              : "agTextColumnFilter",
          ...(item.type === FIELD_TYPES.DATE && {
            filterParams: {
              comparator: (filterDate: Date, cellValue: string) => {
                if (!cellValue) return -1; // Treat empty cells as unmatched

                const [datePart] = cellValue.split(" ");
                const cellDate = new Date(datePart);

                if (isNaN(cellDate.getTime())) return -1;

                if (filterDate.getTime() === cellDate.getTime()) return 0;
                return filterDate.getTime() > cellDate.getTime() ? -1 : 1;
              },
              browserDatePicker: true,
            },
          }),
          ...(item.type === FIELD_TYPES.NUMBER ||
          item.type === FIELD_TYPES.FLOAT ||
          item.type === FIELD_TYPES.CURRENCY
            ? {
                comparator: (valueA: any, valueB: any) =>
                  Number(valueA) - Number(valueB), // Numeric sorting
              }
            : {}),
          ...(item.type === FIELD_TYPES.CURRENCY && {
            valueFormatter: (params) =>
              params.value
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(params.value)
                : "",
          }),
        };
        return colDef;
      });

      if (JSON.stringify(colDefs) !== JSON.stringify(updatedColDefs)) {
        setColDefs(updatedColDefs);
      }
    }
  }, [schema, colDefs, setColDefs]);

  const handleSavingDataset = () => {
    if (!schema || schema.length === 0) {
      console.log("No Schema found");
      return;
    }
    alert("Saving Dataset...");
  };

  const handleClearData = () => {
    clearLocalData();
  };

  const handleHeaderUpdateType = (
    newSchemaArray: SchemaItem[],
    updatedIndex: number
  ) => {
    setSchema(newSchemaArray);

    const updatedColDefs = newSchemaArray.map((item) => {
      const colDef: StrictColDef = {
        field: item.parameter || "",
        filter:
          item.type === FIELD_TYPES.DATE
            ? "agDateColumnFilter"
            : item.type === FIELD_TYPES.NUMBER ||
              item.type === FIELD_TYPES.FLOAT ||
              item.type === FIELD_TYPES.CURRENCY
            ? "agNumberColumnFilter"
            : "agTextColumnFilter",
        ...(item.type === FIELD_TYPES.DATE && {
          filterParams: {
            comparator: (filterDate: Date, cellValue: string) => {
              if (!cellValue) return -1;

              const [datePart] = cellValue.split(" ");
              const cellDate = new Date(datePart);

              if (isNaN(cellDate.getTime())) return -1;

              if (filterDate.getTime() === cellDate.getTime()) return 0;
              return filterDate.getTime() > cellDate.getTime() ? -1 : 1;
            },
            browserDatePicker: true,
          },
        }),
        ...(item.type === FIELD_TYPES.NUMBER ||
        item.type === FIELD_TYPES.FLOAT ||
        item.type === FIELD_TYPES.CURRENCY
          ? {
              comparator: (valueA: any, valueB: any) =>
                Number(valueA) - Number(valueB),
            }
          : {}),
        ...(item.type === FIELD_TYPES.CURRENCY && {
          valueFormatter: (params) =>
            params.value
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(params.value)
              : "",
        }),
      };
      return colDef;
    });

    setColDefs(updatedColDefs);
  };

  const handleHeaderUpdateParameter = (
    updatedParameters: Partial<SchemaItem>[],
    index: number
  ) => {
    if (!schema) return;

    const updatedSchema = schema.map((item, idx) =>
      idx === index ? { ...item, ...updatedParameters[index] } : item
    );

    setSchema(updatedSchema);
  };

  useEffect(() => {
    console.log("Schema updated:", schema);
  }, [schema]);

  return (
    <div className="bg-gray-100 w-full flex flex-col h-full">
      <header className="bg-white shadow p-6">
        <h2 className="text-2xl font-semibold text-center">
          Catēna Data Configuration
        </h2>

        {schema && schema.length > 0 ? (
          <p className="text-center text-green-600 mt-3">
            A saved schema was loaded for review.
          </p>
        ) : (
          <p className="text-center text-red-600 mt-3">
            No saved schema found. Please upload or create a new one.
          </p>
        )}
      </header>

      <main className="flex-grow max-w-7xl mx-auto p-6 flex flex-col w-full">
        {schema && schema.length > 0 ? (
          <section className="bg-white p-6 shadow rounded-lg">
            <SchemaContent
              currentHeaders={colDefs || undefined}
              list={schema || []}
              handleDelete={(id) =>
                setSchema(schema?.filter((item) => item.id !== id) || [])
              }
              handleSavingDataset={handleSavingDataset}
              handleHeaderUpdateType={handleHeaderUpdateType}
              handleHeaderUpdateParameter={handleHeaderUpdateParameter}
            />
          </section>
        ) : (
          <section className="bg-white p-6 shadow rounded-lg">
            <CSVParser
              saveParsedData={(rows, data) => setRowData(data)}
              setHeaders={(rows, schemaArray) => {
                const newHeaderArray: ColDef[] = rows.map((row) => ({
                  field: row,
                }));
                setColDefs(
                  newHeaderArray.map((header) => ({
                    ...header,
                    field: header.field ?? "",
                  }))
                );

                setSchema(schemaArray);
              }}
              handleDataCreation={setRowData}
              setSchema={setSchema}
            />
          </section>
        )}

        {rowData && colDefs && (
          <section className="bg-white mt-8 p-6 shadow rounded-lg flex-grow w-full">
            <div className="w-full">
              <AGGrid
                rows={rowData}
                columns={colDefs}
                setHeight="600px"
                paginate={true}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DataSetup;
