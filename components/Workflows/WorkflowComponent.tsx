// WorkflowComponent.tsx

import React, { useState, useEffect } from "react";
import { useWorkflow } from "@/app/context/WorkflowContext";
import workflow from "@/app/workflow-engine/workflow";
import SavedWorkflowsDropdown from "./SavedWorkflowsDropdown";
import { WorkflowItemState } from "@/app/context/WorkflowContext";

const WorkflowComponent: React.FC = () => {
  const {
    state,
    dispatch,
    addItem,
    saveWorkflow,
    setLoading,
    loading,
    savedWorkflows,
  } = useWorkflow();
  const [newItemName, setNewItemName] = useState<string>("");
  const [workflowName, setWorkflowName] = useState<string>("");

  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  const handleTransition = (itemId: string, action: string) => {
    dispatch({ type: "transition", itemId, action });
  };

  const handleInsertAfter = (itemId: string, name: string) => {
    const newId = `item-${Date.now()}`;
    dispatch({ type: "insertAfter", itemId, newItemId: newId, name });
  };

  const handleDeleteStep = (itemId: string) => {
    dispatch({ type: "deleteStep", itemId });
  };

  const handleRemoveAllBelow = (itemId: string) => {
    dispatch({ type: "removeAllBelow", itemId });
  };

  const handleAddItem = () => {
    if (!newItemName) return;
    addItem(newItemName);
    setNewItemName("");
  };

  const handleSaveWorkflow = () => {
    if (!workflowName) return;
    saveWorkflow(workflowName);
  };

  const handleSetWorkflowName = () => {
    setLoading(false);
  };

  const renderItem = (item: WorkflowItemState) => (
    <li key={item.id} className="mb-4 p-4 border border-gray-300 rounded-md">
      <p className="text-lg">
        Item ID: <span className="font-semibold">{item.id}</span>
      </p>
      <p className="text-lg">
        Name: <span className="font-semibold">{item.name}</span>
      </p>
      <p className="text-lg">
        Current State:{" "}
        <span className="font-semibold">{item.currentState}</span>
      </p>
      <div className="flex flex-col space-y-2">
        {Object.keys(workflow.states[item.currentState].on).map((action) => (
          <button
            key={action}
            onClick={() => handleTransition(item.id, action)}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition whitespace-nowrap"
          >
            {action}
          </button>
        ))}
        <button
          onClick={() => handleInsertAfter(item.id, newItemName)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition whitespace-nowrap"
        >
          Insert After
        </button>
        <button
          onClick={() => handleDeleteStep(item.id)}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition whitespace-nowrap"
        >
          Delete Step
        </button>
        <button
          onClick={() => handleRemoveAllBelow(item.id)}
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition whitespace-nowrap"
        >
          Remove All Below
        </button>
      </div>
      {item.children.length > 0 && (
        <ul className="pl-5 list-disc">{item.children.map(renderItem)}</ul>
      )}
    </li>
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Workflow</h1>
      {loading ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workflow Name
          </label>
          <input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="Workflow Name"
            className="block w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <button
            onClick={handleSetWorkflowName}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Start New Workflow
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Item Name
            </label>
            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item Name"
              className="block w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
              onClick={handleAddItem}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add Item
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Save Workflow
            </label>
            <input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="Workflow Name"
              className="block w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
              onClick={handleSaveWorkflow}
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Save Workflow
            </button>
          </div>

          {state.rootItem && (
            <ul className="list-disc pl-5">{renderItem(state.rootItem)}</ul>
          )}
        </>
      )}
    </div>
  );
};

export default WorkflowComponent;
