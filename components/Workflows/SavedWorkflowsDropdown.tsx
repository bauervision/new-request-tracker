import React, { useEffect, useState, useRef } from "react";
import { useWorkflow } from "@/app/context/WorkflowContext";

const SavedWorkflowsDropdown: React.FC = () => {
  const { getSavedWorkflows, loadWorkflow, deleteWorkflow } = useWorkflow();
  const [savedWorkflows, setSavedWorkflows] = useState<string[]>([]);
  const workflowsLoaded = useRef(false); // Track if workflows are loaded initially

  useEffect(() => {
    if (!workflowsLoaded.current) {
      // Fetch workflows only once
      const workflows = getSavedWorkflows();
      setSavedWorkflows(workflows);
      workflowsLoaded.current = true; // Mark workflows as loaded
    }
  }, [getSavedWorkflows]); // Only run on mount

  const handleLoadWorkflow = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const workflowName = e.target.value;
    if (workflowName) {
      loadWorkflow(workflowName); // Load the workflow
    }
  };

  const handleDeleteWorkflow = (workflowName: string) => {
    deleteWorkflow(workflowName);
    const updatedWorkflows = getSavedWorkflows();
    setSavedWorkflows(updatedWorkflows); // Update workflows after delete
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Load Workflow
      </label>
      <select
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
      <ul className="list-disc pl-5">
        {savedWorkflows.map((name) => (
          <li key={name} className="flex items-center space-x-2">
            <span>{name}</span>
            <button
              onClick={() => handleDeleteWorkflow(name)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedWorkflowsDropdown;
