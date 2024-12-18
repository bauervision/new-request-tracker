import React, { useState, useEffect, memo } from "react";
import { useWorkflow, WorkflowItemState } from "@/app/context/WorkflowContext";
import workflow from "@/app/workflow-engine/workflow";

const WorkflowComponent: React.FC = memo(() => {
  const {
    state,
    dispatch,
    addItem,
    saveWorkflow,
    deleteWorkflow,
    setLoading,
    loading,
    currentWorkflowName,
    setCurrentWorkflowName,
  } = useWorkflow();
  const [newItemName, setNewItemName] = useState<string>("");

  const handleSaveWorkflow = () => {
    if (currentWorkflowName) {
      saveWorkflow(currentWorkflowName);
      alert("Workflow saved successfully!");
    }
  };

  const handleDeleteWorkflow = () => {
    if (currentWorkflowName) {
      deleteWorkflow(currentWorkflowName);
      setCurrentWorkflowName(""); // Clear the current workflow name
      alert("Workflow deleted successfully!");
    }
  };

  const handleAddItem = () => {
    if (!newItemName) return;
    addItem(newItemName);
    setNewItemName("");
  };

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

  const renderItem = (item: WorkflowItemState) => (
    <li key={item.id} className="mb-4 p-4 border border-gray-300 rounded-md">
      <div className="flex items-center space-x-4">
        <p className="text-lg">
          <span className="font-semibold">{item.id}</span>
        </p>
        <p className="text-lg">
          <span className="font-semibold">{item.name}</span>
        </p>
        <p className="text-lg">
          Current State:{" "}
          <span className="font-semibold">{item.currentState}</span>
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {Object.keys(workflow.states[item.currentState].on).map((action) => (
          <button
            key={action}
            onClick={() => handleTransition(item.id, action)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition whitespace-nowrap"
          >
            {action}
          </button>
        ))}
        <button
          onClick={() => handleInsertAfter(item.id, newItemName)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition whitespace-nowrap"
        >
          Insert After
        </button>
        <button
          onClick={() => handleDeleteStep(item.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition whitespace-nowrap"
        >
          Delete Step
        </button>
        <button
          onClick={() => handleRemoveAllBelow(item.id)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition whitespace-nowrap"
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
    <div className="p-6  mx-auto bg-white rounded-xl shadow-md space-y-4">
      {/* Header with Workflow Name and Action Buttons */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {currentWorkflowName || "New Workflow"}
        </h1>
        {currentWorkflowName && (
          <div className="flex space-x-2">
            <button
              onClick={handleSaveWorkflow}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              onClick={handleDeleteWorkflow}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Add New Item Section */}
      {!loading && (
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
      )}
      {state.rootItem && (
        <ul className="list-disc pl-5">{renderItem(state.rootItem)}</ul>
      )}
    </div>
  );
});

export default WorkflowComponent;
