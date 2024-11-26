// components/WorkflowDialog.tsx

import React, { useState, useEffect } from "react";
import { DialogOverlay, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

interface WorkflowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { step: string; name: string; email: string }) => void;
  initialData?: { step: string; name: string; email: string }; // Make initialData optional
}

const WorkflowDialog: React.FC<WorkflowDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [step, setStep] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initialData) {
      setStep(initialData.step);
      setName(initialData.name);
      setEmail(initialData.email);
    } else {
      setStep("");
      setName("");
      setEmail("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    onSubmit({ step, name, email });
    onClose();
  };

  return (
    <div>
      <DialogOverlay />
      <DialogContent>
        <h2>{initialData ? "Edit Workflow Item" : "Add New Workflow Item"}</h2>
        <div>
          <label>
            Step:
            <input
              type="text"
              value={step}
              onChange={(e) => setStep(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Button variant="outline" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </div>
  );
};

export default WorkflowDialog;
