import React from "react";
import NewRequestItem from "../NewRequestItem";
import { Combobox } from "../ComboBox";
import { statuses, products } from "./requestData";

interface NewRequestPageProps {
  onValueChange: (value: string) => void;
}

export function NewRequestPage1({ onValueChange }: NewRequestPageProps) {
  return (
    <div>
      <div className="grid pb-4 justify-center items-center text-2xl">
        Main Request
      </div>
      <div className="grid grid-cols-3 gap-3  items-center ">
        <NewRequestItem id="01" label="Product" onValueChange={onValueChange}>
          <Combobox
            placeholder="Select your product..."
            label="Products"
            data={products}
            onStatusChange={onValueChange}
          />
        </NewRequestItem>
        <NewRequestItem id="02" label="Field 2" onValueChange={onValueChange} />
        <NewRequestItem id="03" label="Field 3" onValueChange={onValueChange} />

        <NewRequestItem id="04" label="Field 4" onValueChange={onValueChange} />
        <NewRequestItem id="05" label="Field 5" onValueChange={onValueChange} />
        <NewRequestItem id="06" label="Field 6" onValueChange={onValueChange} />
      </div>
    </div>
  );
}
