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
  const [editableItemId, setEditableItemId] = useState<string | null>(null);
  const [newWorkflowName, setNewWorkflowName] = useState<string>("");

  // Function to handle creating a new workflow
  const handleCreateNewWorkflow = () => {
    if (!newWorkflowName.trim()) return; // Ensure a valid workflow name is provided
    setCurrentWorkflowName(newWorkflowName); // Set the new workflow name
    setLoading(false); // Ensure loading is set to false
    setNewWorkflowName(""); // Clear the workflow name input
  };

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
    setEditableItemId(newId); // Set the new item ID for editing
  };

  const handleDeleteStep = (itemId: string) => {
    dispatch({ type: "deleteStep", itemId });
  };
  const handleRemoveAllBelow = (itemId: string) => {
    dispatch({ type: "removeAllBelow", itemId });
  };

  useEffect(() => {
    if (state.rootItem && loading) {
      setLoading(false); // Set loading to false after loading workflow
    }
  }, [state.rootItem, loading, setLoading]);

  const renderItem = (itemId: string): JSX.Element => {
    if (!state.items || !state.items[itemId]) {
      console.log("Item not found:", itemId); // Add this for debugging
      return <></>;
    } // Safeguard against undefined
    const item = state.items[itemId]; // Resolve the item by its ID
    console.log("Rendering Item:", item); // Log the item
    if (!item) return <></>; // If the item does not exist, return an empty fragment

    return (
      <li key={item.id} className="mb-4 p-4 border border-gray-300 rounded-md">
        <div className="flex space-x-4 items-center">
          {" "}
          {/* New flex container */}
          <p className="text-lg">
            <span className="font-semibold">ID: {item.id}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Name: {item.name}</span>
          </p>
          <p className="text-lg">
            Current State:{" "}
            <span className="font-semibold">{item.currentState}</span>
          </p>
        </div>

        <div className="flex flex-row space-x-2 mt-2">
          {Object.keys(workflow.states[item.currentState].on).map((action) => (
            <button
              key={action}
              onClick={() => handleTransition(item.id, action)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              {action}
            </button>
          ))}
          <button
            onClick={() => handleInsertAfter(item.id, newItemName)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Insert After
          </button>
          <button
            onClick={() => handleDeleteStep(item.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete Step
          </button>
          <button
            onClick={() => handleRemoveAllBelow(item.id)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Remove All Below
          </button>
        </div>

        {item.children.length > 0 && (
          <ul className="pl-5 list-disc">
            {item.children.map((childId) => renderItem(childId))}{" "}
            {/* Map over child IDs */}
          </ul>
        )}
      </li>
    );
  };

  // Render the "Create New Workflow" section if no workflow is loaded
  const renderCreateNewWorkflowOption = () => (
    <div className="flex justify-center mt-6 space-x-4">
      <input
        type="text"
        value={newWorkflowName}
        onChange={(e) => setNewWorkflowName(e.target.value)}
        className="border border-gray-300 rounded-lg p-2"
        placeholder="Enter workflow name"
      />
      <button
        onClick={handleCreateNewWorkflow}
        disabled={!newWorkflowName.trim()}
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${
          !newWorkflowName.trim() ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Create New Workflow
      </button>
    </div>
  );

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md space-y-4">
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
      {!loading && currentWorkflowName && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Item Name
          </label>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter name for new item"
          />
          <button
            onClick={handleAddItem}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mt-2"
          >
            Add Item
          </button>
        </div>
      )}

      {/* Render Workflow */}
      {currentWorkflowName ? (
        <ul>{state.rootItem && renderItem(state.rootItem)}</ul>
      ) : (
        renderCreateNewWorkflowOption() // Show the input and button for new workflow
      )}
    </div>
  );
});

export default WorkflowComponent;
