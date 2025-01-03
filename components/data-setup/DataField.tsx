import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../ui/button";
import { FIELD_TYPES } from "@/app/constants"; // Import FIELD_TYPES

interface DataFieldProps {
  newParameter: string;
  setNewParameter: (value: string, index: number) => void;
  setNewValue: (value: string, index: number) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  index: number;
  handleDelete: (index: number) => void;
  dataType: string;
  selectedFormat: string | null; // Add for selected date format
  handleDateFormatChange: (index: number, format: string) => void; // Callback for date format change
}

const dataTypes = [
  { value: FIELD_TYPES.NUMBER, label: "Integer" },
  { value: FIELD_TYPES.TEXT, label: "String" },
  { value: FIELD_TYPES.DATE, label: "Date" },
  { value: FIELD_TYPES.FLOAT, label: "Float" },
  { value: FIELD_TYPES.BOOLEAN, label: "Boolean" },
];

const DATE_FORMAT_OPTIONS = [
  "MM/DD/YYYY",
  "DD/MM/YYYY",
  "YYYY-MM-DD",
  "MMM DD, YYYY",
];

export const DataField: React.FC<DataFieldProps> = ({
  newParameter,
  setNewParameter,
  setNewValue,
  handleSubmit,
  placeholder,
  index,
  handleDelete,
  dataType,
  selectedFormat,
  handleDateFormatChange,
}) => {
  return (
    <div className="p-3 w-full bg-slate-100 my-2 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 w-full">
          {/* Parameter Name Input */}
          <Input
            className="flex-grow"
            placeholder={placeholder}
            value={newParameter}
            onChange={(e) => setNewParameter(e.target.value, index)}
          />

          {/* Type Dropdown */}
          <Select
            onValueChange={(value) => setNewValue(value, index)}
            value={dataType} // Use "string" as the default type in schema
          >
            <SelectTrigger className="w-1/4">
              <SelectValue>
                {dataTypes.find((type) => type.value === dataType)?.label ||
                  "String"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {dataTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Conditional Date Format Dropdown */}
          {dataType === FIELD_TYPES.DATE && (
            <div className="ml-3">
              <select
                className="form-select"
                value={selectedFormat || ""}
                onChange={(e) => handleDateFormatChange(index, e.target.value)}
              >
                <option value="" disabled>
                  Select Date Format
                </option>
                {DATE_FORMAT_OPTIONS.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Delete Button */}
          <Button
            variant="outline"
            onClick={() => handleDelete(index)}
            type="button"
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};
