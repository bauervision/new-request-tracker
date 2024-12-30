import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Stack } from "react-bootstrap";
import { DataField } from "./DataField";
import { ColDef } from "ag-grid-community";
import { Button } from "../ui/button";

interface SchemaItem {
  id: number;
  type: string;
  parameter: string;
}

interface SchemaContentProps {
  currentHeaders?: ColDef[]; // Add this to the props
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

export const SchemaContent: React.FC<SchemaContentProps> = ({
  list,
  handleDelete,
  handleSavingDataset,
  handleHeaderUpdateType,
  handleHeaderUpdateParameter,
}) => {
  const setNewValue = (newTypeValue: string, updatedIndex: number) => {
    const updatedSchema = list.map((item) =>
      item.id === updatedIndex
        ? { id: item.id, type: newTypeValue, parameter: item.parameter }
        : item
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

  return (
    <>
      <div className="overflow-y-auto max-h-72 border p-4 rounded-md">
        <ListGroup>
          {list &&
            list.length > 0 &&
            list.map((item, i) => (
              <Stack direction="horizontal" key={item.parameter}>
                <ListGroup.Item>
                  <DataField
                    placeholder="Add Parameter"
                    newParameter={item.parameter}
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
