import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Stack } from "react-bootstrap";
import { DataField } from "./DataField";
import { ColDef } from "ag-grid-community";
import { Button } from "../ui/button";
import { FIELD_TYPES } from "@/app/constants";

interface SchemaItem {
  id: number;
  type: string;
  parameter: string;
  format?: string;
}

interface SchemaContentProps {
  currentHeaders?: ColDef[];
  list: SchemaItem[];
  handleDelete: (index: number) => void;
  handleSavingDataset: () => void;
  handleHeaderUpdateType: (
    updatedSchema: SchemaItem[],
    updatedIndex: number
  ) => void;
  handleHeaderUpdateParameter: (
    updatedParameters: SchemaItem[],
    index: number
  ) => void;
}

const DATE_FORMAT_OPTIONS = [
  "MM/DD/YYYY",
  "DD/MM/YYYY",
  "YYYY-MM-DD",
  "MMM DD, YYYY",
];

export const SchemaContent: React.FC<SchemaContentProps> = ({
  list,
  handleDelete,
  handleSavingDataset,
  handleHeaderUpdateType,
  handleHeaderUpdateParameter,
}) => {
  const [selectedFormats, setSelectedFormats] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    const initialFormats: Record<number, string> = {};
    list.forEach((item) => {
      if (item.type === FIELD_TYPES.DATE && item.format) {
        initialFormats[item.id] = item.format;
      }
    });
    setSelectedFormats(initialFormats);
  }, [list]);

  const setNewValue = (newTypeValue: string, updatedIndex: number) => {
    const normalizedType = newTypeValue.toLowerCase();
    if (!Object.values(FIELD_TYPES).includes(normalizedType)) {
      console.error(`Invalid type: ${normalizedType}`);
      return;
    }

    const updatedSchema = list.map((item) =>
      item.id === updatedIndex ? { ...item, type: normalizedType } : item
    );
    handleHeaderUpdateType(updatedSchema, updatedIndex);
  };

  const setNewParameter = (parameter: string, index: number) => {
    const updatedParameters = list.map((item) =>
      item.id === index
        ? { id: item.id, type: item.type, parameter: parameter }
        : item
    );
    handleHeaderUpdateParameter(updatedParameters, index);
  };

  const handleDateFormatChange = (id: number, format: string) => {
    setSelectedFormats((prev) => ({ ...prev, [id]: format }));

    const updatedSchema = list.map((item) =>
      item.id === id ? { ...item, format } : item
    );
    handleHeaderUpdateParameter(updatedSchema, id);
  };

  return (
    <>
      <div className="overflow-y-auto max-h-72 border p-4 rounded-md">
        <ListGroup>
          {list &&
            list.length > 0 &&
            list.map((item, i) => (
              <Stack direction="horizontal" key={item.parameter}>
                <ListGroup.Item className="flex items-center w-full">
                  <DataField
                    placeholder="Add Parameter"
                    newParameter={item.parameter}
                    selectedFormat={selectedFormats[item.id] || null}
                    handleDateFormatChange={handleDateFormatChange}
                    index={i}
                    setNewValue={setNewValue}
                    setNewParameter={setNewParameter}
                    dataType={item.type}
                    handleSubmit={() => {}} // Add appropriate handleSubmit function if needed
                    handleDelete={handleDelete}
                  />
                </ListGroup.Item>
              </Stack>
            ))}
        </ListGroup>
      </div>
      <div className="flex justify-center mt-3">
        <Button
          onClick={handleSavingDataset}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Schema
        </Button>
      </div>
    </>
  );
};
