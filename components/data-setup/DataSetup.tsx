"use client";

import React, { useState, useEffect } from "react";
// import "../../app/";

import moment from "moment";
import { ColDef } from "ag-grid-community";

import AddDataField from "./AddDataField";
import DataHeader from "./DataHeader";
import { SchemaContent } from "./SchemaContent";

import { CSVParser } from "./CSVParser";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AGGrid } from "./AGGrid";
import { LoadCSVData } from "./LoadCSVData";
import { AGPieChart } from "./AGPieChart";

// Define types
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
  const [schema, setSchema] = useState<SchemaItem[] | undefined>(undefined);
  const [newType, setNewType] = useState<string>("string");
  const [newParameter, setNewParameter] = useState<string>("");
  const [rowData, setRowData] = useState<any[] | undefined>(undefined);
  const [colDefs, setColDefs] = useState<ColDef[] | undefined>(undefined);
  const [loadSchema, setLoadSchema] = useState<boolean>(true);

  useEffect(() => {
    if (myData) {
      setRowData(myData.data || []);
      setColDefs(myData.headers || []);
      setSchema(myData.schema || []);
    }
  }, [myData]);

  const addSchemaItems = async (item: string) => {
    if (!schema) return;
    const id = schema.length ? schema[schema.length - 1].id + 1 : 1;
    const newItem: SchemaItem = {
      id,
      type: newType,
      parameter: newParameter,
    };

    setSchema([...schema, newItem]);
  };

  const handleDelete = (id: number) => {
    if (!schema) return;
    setSchema(schema.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSchemaItems(newParameter);
    setNewParameter("");
  };

  const handleSavingDataset = () => {
    if (!schema || schema.length === 0 || !myData) {
      console.log("No Schema found");
      return;
    }
    alert("Saving Dataset...");
  };

  const handleDataCreation = (parsedData: any[]) => {
    setRowData(parsedData);
  };

  const handleHeaderCreation = (rows: string[], schemaArray: SchemaItem[]) => {
    const newHeaderArray: ColDef[] = rows.map((row) => ({ field: row }));
    setColDefs(newHeaderArray);
    setSchema(schemaArray);
  };

  const handleHeaderUpdateType = (
    newSchemaArray: SchemaItem[],
    updatedIndex: number
  ) => {
    setSchema(newSchemaArray);

    const updatedColDefs: ColDef[] = newSchemaArray.map((item) => {
      const colDef: ColDef = {
        field: item.parameter,
      };

      if (item.type === "date") {
        // Use `filter` for date column
        colDef.filter = "agDateColumnFilter";
      } else if (item.type === "int" || item.type === "float") {
        // Assign comparator for numeric columns
        colDef.comparator = (valueA: any, valueB: any) => valueA - valueB;
      }

      return colDef;
    });

    setColDefs(updatedColDefs);
  };

  const saveParsedData = (rows: string[], data: any[]) => {
    console.log("Saving parsed data", rows, data);
  };

  const getParsedValueFromType = (type: string, value: any): any => {
    switch (type) {
      case "int":
        return parseInt(value, 10);
      case "float":
        return parseFloat(value.replace(/,/g, ""));
      case "date":
        return moment(value, "MM-DD-YYYY").toDate();
      default:
        return value;
    }
  };

  const getColumnComparatorFromType = (type: string) => {
    switch (type) {
      case "int":
      case "float":
        return (valueA: any, valueB: any) => valueA - valueB;
      case "date":
        return "agDateColumnFilter";
      default:
        return (valueA: any, valueB: any) => {
          if (valueA === valueB) return 0;
          return valueA > valueB ? 1 : -1;
        };
    }
  };

  const handleHeaderUpdateParameter = (
    updatedParameters: any[],
    index: number
  ) => {
    console.log("Updated Parameters:", updatedParameters);
  };

  return (
    <div className="bg-gray-100 w-full flex flex-col h-full">
      <header className="bg-white shadow p-6">
        <h2 className="text-2xl font-semibold text-center">
          Catēna Data Configuration
        </h2>
        {myData?.schema?.length && myData?.data?.length ? (
          <p className="text-center text-green-600 mt-3">
            Saved dataset loaded.
          </p>
        ) : null}
      </header>

      <main className="flex-grow max-w-7xl mx-auto p-6 flex flex-col w-full">
        {/* Top Section */}
        <section className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-center">Load Schema from CSV file</h2>

          {loadSchema ? (
            <CSVParser
              saveParsedData={saveParsedData}
              setHeaders={handleHeaderCreation}
              handleDataCreation={handleDataCreation}
              setSchema={setSchema}
            />
          ) : (
            <AddDataField
              newValue={newType}
              newParameter={newParameter}
              setNewParameter={setNewParameter}
              setNewValue={setNewType}
              handleSubmit={handleSubmit}
            />
          )}

          {schema && (
            <SchemaContent
              currentHeaders={colDefs}
              list={schema}
              handleDelete={handleDelete}
              handleSavingDataset={handleSavingDataset}
              handleHeaderUpdateType={handleHeaderUpdateType}
              handleHeaderUpdateParameter={handleHeaderUpdateParameter}
            />
          )}
        </section>

        {/* Bottom Section */}
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
