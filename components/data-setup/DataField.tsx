import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup, Stack } from "react-bootstrap";

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
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        <Stack direction="horizontal" gap={3} className="mb-3">
          <InputGroup>
            <Form.Control
              value={newParameter}
              placeholder={placeholder}
              aria-label={placeholder}
              onChange={(e) => setNewParameter(e.target.value, index)}
            />
          </InputGroup>

          <Form.Select
            value={dataType}
            aria-label="Default select example"
            onChange={(e) => setNewValue(e.target.value, index)}
          >
            <option>Set Data Type</option>
            <option value="int">Integer</option>
            <option value="string">String</option>
            <option value="Date">Date</option>
            <option value="float">Float</option>
            <option value="bool">Boolean</option>
          </Form.Select>

          <Button type="button" onClick={() => handleDelete(index)}>
            <i className="bi bi-trash3"></i>
          </Button>
        </Stack>
      </Form>
    </div>
  );
};
