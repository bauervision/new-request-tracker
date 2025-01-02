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

const DataSetup: React.FC<DataSetupProps> = ({ myData }) => {
  const { schema, setSchema, rowData, setRowData, colDefs, setColDefs } =
    useSchema();

  useEffect(() => {
    // Initialize context state from `myData` if provided
    if (myData) {
      setRowData(myData.data || []);
      setColDefs(myData.headers || []);
      setSchema(myData.schema || []);
    }
  }, [myData, setSchema, setRowData, setColDefs]);

  const handleSavingDataset = () => {
    if (!schema || schema.length === 0) {
      console.log("No Schema found");
      return;
    }
    alert("Saving Dataset...");
  };

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
              handleHeaderUpdateType={(newSchemaArray) =>
                setSchema(newSchemaArray)
              }
              handleHeaderUpdateParameter={(updatedParameters, index) => {
                const updatedSchema =
                  schema?.map((item, idx) =>
                    idx === index
                      ? { ...item, ...updatedParameters[index] }
                      : item
                  ) || [];
                setSchema(updatedSchema);
              }}
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
