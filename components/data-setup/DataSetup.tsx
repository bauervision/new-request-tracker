"use client";

import React, { useEffect } from "react";
import { ColDef } from "ag-grid-community";

import { SchemaContent } from "./SchemaContent";
import { CSVParser } from "./CSVParser";
import { AGGrid } from "./AGGrid";
import { useSchema } from "@/app/context/SchemaContext";

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
    // Ensure column definitions are created on page load and schema change
    const initializeColDefs = () => {
      if (schema && schema.length > 0) {
        const updatedColDefs: StrictColDef[] = schema.map((item) => ({
          field: item.parameter || "", // Ensure field is never undefined
          filter:
            item.type === "date"
              ? "agDateColumnFilter"
              : item.type === "int" || item.type === "float"
              ? "agNumberColumnFilter"
              : "agTextColumnFilter", // Dynamically set filter type
          ...(item.type === "int" || item.type === "float"
            ? {
                comparator: (valueA: any, valueB: any) =>
                  Number(valueA) - Number(valueB), // Numeric comparator for sorting
              }
            : {}),
        }));

        // Update column definitions
        if (JSON.stringify(colDefs) !== JSON.stringify(updatedColDefs)) {
          setColDefs(updatedColDefs);
        }
      } else {
        // Fallback column definitions
        const defaultColDefs: StrictColDef[] = [
          {
            field: "defaultField",
            headerName: "Default Header",
            filter: "agTextColumnFilter",
          },
        ];

        // Set default columns
        if (JSON.stringify(colDefs) !== JSON.stringify(defaultColDefs)) {
          setColDefs(defaultColDefs);
        }
      }
    };

    // Run on page load
    initializeColDefs();
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

    const updatedColDefs: StrictColDef[] = newSchemaArray.map((item) => ({
      field: item.parameter || "", // Ensure field is never undefined
      filter:
        item.type === "date"
          ? "agDateColumnFilter"
          : item.type === "int" || item.type === "float"
          ? "agNumberColumnFilter"
          : "agTextColumnFilter", // Dynamically set filter type
      ...(item.type === "int" || item.type === "float"
        ? {
            comparator: (valueA: any, valueB: any) =>
              Number(valueA) - Number(valueB), // Numeric comparator for sorting
          }
        : {}),
    }));

    setColDefs(updatedColDefs); // Pass the strictly typed array
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

  return (
    <div className="bg-gray-100 w-full flex flex-col h-full">
      <header className="bg-white shadow p-6">
        <h2 className="text-2xl font-semibold text-center">
          Catēna Data Configuration
        </h2>

        {/* Reset Data Button
        <button
          onClick={handleClearData}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset All Data
        </button> */}

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
        {/* Render SchemaContent if schema exists */}
        {schema && schema.length > 0 ? (
          <section className="bg-white p-6 shadow rounded-lg">
            <SchemaContent
              currentHeaders={colDefs || undefined} // Convert `null` to `undefined`
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
                    field: header.field ?? "", // Ensure `field` is a string
                  }))
                );

                setSchema(schemaArray);
              }}
              handleDataCreation={setRowData}
              setSchema={setSchema}
            />
          </section>
        )}

        {/* Render AGGrid if rowData and colDefs exist */}
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
