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

interface DataFieldProps {
  newParameter: string;
  setNewParameter: (value: string, index: number) => void;
  setNewValue: (value: string, index: number) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  index: number;
  handleDelete: (index: number) => void;
  dataType: string;
}

const dataTypes = [
  { value: "int", label: "Integer" },
  { value: "string", label: "String" },
  { value: "Date", label: "Date" },
  { value: "float", label: "Float" },
  { value: "bool", label: "Boolean" },
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
}) => {
  return (
    <div className="p-3 w-full bg-slate-100 my-2 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 w-full">
          {/* Input Field */}
          <div className="flex-grow">{newParameter}</div>

          {/* Select Dropdown */}
          <Select
            onValueChange={(value) => setNewValue(value, index)}
            defaultValue={dataType}
          >
            <SelectTrigger className="w-1/4">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {dataTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
