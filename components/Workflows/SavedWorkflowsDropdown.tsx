import React, { useEffect, useState, useRef } from "react";
import { useWorkflow } from "@/app/context/WorkflowContext";

const SavedWorkflowsDropdown: React.FC = () => {
  const {
    getSavedWorkflows,
    loadWorkflow,
    deleteWorkflow,
    setCurrentWorkflowName,
  } = useWorkflow();
  const [savedWorkflows, setSavedWorkflows] = useState<string[]>([]);
  const workflowsLoaded = useRef(false);

  // Load workflows when the component mounts
  useEffect(() => {
    if (!workflowsLoaded.current) {
      const workflows = getSavedWorkflows();
      setSavedWorkflows(workflows); // Update state with saved workflows
      workflowsLoaded.current = true;
    }
  }, [getSavedWorkflows]);

  const handleLoadWorkflow = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const workflowName = e.target.value;
    if (workflowName) {
      loadWorkflow(workflowName);
      setCurrentWorkflowName(workflowName); // Update current workflow name
    }
  };

  const handleDeleteWorkflow = (workflowName: string) => {
    deleteWorkflow(workflowName);
    const updatedWorkflows = getSavedWorkflows();
    setSavedWorkflows(updatedWorkflows); // Update dropdown list after deleting
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Load Workflow
      </label>
      <select
        disabled={savedWorkflows.length == 0}
        onChange={handleLoadWorkflow}
        className="block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select a workflow</option>
        {savedWorkflows.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SavedWorkflowsDropdown;
