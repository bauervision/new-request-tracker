import React, { useEffect, useState } from "react";
import { useWorkflow } from "@/app/context/WorkflowContext";

const SavedWorkflowsDropdown: React.FC = () => {
  const { savedWorkflows, loadWorkflow, setCurrentWorkflowName } =
    useWorkflow();
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(""); // Track the selected workflow

  const handleLoadWorkflow = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const workflowName = e.target.value;
    setSelectedWorkflow(workflowName); // Update selected workflow

    if (workflowName) {
      loadWorkflow(workflowName);
      setCurrentWorkflowName(workflowName); // Update current workflow name
    }
  };

  // Reset the dropdown selection if the workflow list changes
  useEffect(() => {
    if (!savedWorkflows.includes(selectedWorkflow)) {
      setSelectedWorkflow(""); // Reset to "Select a workflow" if the selected one is deleted
    }
  }, [savedWorkflows, selectedWorkflow]);

  return (
    <div className=" ">
      {savedWorkflows.length > 0 ? (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Load Workflow
          </label>
          <select
            value={selectedWorkflow}
            disabled={savedWorkflows.length === 0}
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
        </>
      ) : (
        <div className="">No Workflows Found, please create one first</div>
      )}
    </div>
  );
};

export default SavedWorkflowsDropdown;
