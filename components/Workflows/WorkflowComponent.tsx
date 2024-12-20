import React, { useState, useEffect, useRef, memo } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useWorkflow } from "@/app/context/WorkflowContext";
import workflow from "@/app/workflow-engine/workflow";
import { useUser } from "@/app/context/UserContext";

const WorkflowComponent: React.FC = memo(() => {
  const {
    state,
    dispatch,
    addItem,
    saveWorkflow,
    deleteWorkflow,
    unloadWorkflow,
    setLoading,
    loading,
    currentWorkflowName,
    setCurrentWorkflowName,
    getSavedWorkflows,
  } = useWorkflow();

  const { user } = useUser();
  const [newItemName, setNewItemName] = useState<string>("");
  const [newWorkflowName, setNewWorkflowName] = useState<string>("");
  const [workflowKey, setWorkflowKey] = useState<string>("");
  const [workflowDescription, setWorkflowDescription] = useState<string>("");

  const [itemRefs, setItemRefs] = useState<
    Record<string, React.RefObject<HTMLInputElement>>
  >({});

  // Track the editing item and dialog state
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Record<string, any>>({});

  // Track items that were newly inserted and need a name save
  const [unsavedItems, setUnsavedItems] = useState<Set<string>>(new Set());

  // Track items whose names have been modified from their original names
  const [changedItems, setChangedItems] = useState<Set<string>>(new Set());

  // Store the original name of each item at load or creation time
  const [originalItemNames, setOriginalItemNames] = useState<
    Record<string, string>
  >({});

  const inputRef = useRef<HTMLInputElement>(null);

  // Track if we need to save after performing certain actions
  const [needsSave, setNeedsSave] = useState(false);

  // Track collapsed items
  const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());

  // Toggle collapse state for an item
  const toggleCollapse = (itemId: string) => {
    setCollapsedItems((prev) => {
      const updated = new Set(prev);
      if (updated.has(itemId)) {
        updated.delete(itemId); // Expand if collapsed
      } else {
        updated.add(itemId); // Collapse if expanded
      }
      return updated;
    });
  };

  const handleSaveWorkflow = () => {
    if (currentWorkflowName) {
      saveWorkflow(currentWorkflowName);
      alert("Workflow saved successfully!");
      getSavedWorkflows();
    } else {
      alert("Workflow requires a name!");
    }
  };

  const handleDeleteWorkflow = () => {
    if (currentWorkflowName) {
      deleteWorkflow(currentWorkflowName);
      setCurrentWorkflowName("");
      alert("Workflow deleted successfully!");
    }
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      alert("Item requires a name!");
      return;
    }
    console.log("handleAddItem called");
    addItem(newItemName);
    setNewItemName("");
    setNeedsSave(true);
  };

  const handleTransition = (itemId: string, action: string) => {
    dispatch({ type: "transition", itemId, action });
    setNeedsSave(true); // State changed, might need saving
  };

  const handleInsertAfter = (itemId: string) => {
    const newId = `item-${Date.now()}`;
    dispatch({ type: "insertAfter", itemId, newItemId: newId, name: "" });
    setUnsavedItems((prev) => new Set(prev).add(newId));

    setItemRefs((prev) => ({
      ...prev,
      [newId]: React.createRef(),
    }));

    setTimeout(() => {
      itemRefs[newId]?.current?.focus();
    }, 0);
    setNeedsSave(true);
  };

  const handleDeleteStep = (itemId: string) => {
    dispatch({ type: "deleteStep", itemId });
    if (unsavedItems.has(itemId)) {
      setUnsavedItems((prev) => {
        const updated = new Set(prev);
        updated.delete(itemId);
        return updated;
      });
    }
    if (changedItems.has(itemId)) {
      setChangedItems((prev) => {
        const updated = new Set(prev);
        updated.delete(itemId);
        return updated;
      });
    }
    setNeedsSave(true);
  };

  const handleRemoveAllBelow = (itemId: string) => {
    dispatch({ type: "removeAllBelow", itemId });
    setNeedsSave(true);
  };

  const handleCreateNewWorkflow = () => {
    if (newWorkflowName.trim()) {
      setCurrentWorkflowName(newWorkflowName);
      setNeedsSave(true);

      // Save the key and description as part of the workflow state
      saveWorkflow(newWorkflowName); // Save the initial state of the workflow
      setWorkflowKey("");
      setWorkflowDescription("");
      setNewWorkflowName("");
    } else {
      alert("Workflow requires a name!");
    }
  };

  const handleUnloadWorkflow = () => {
    unloadWorkflow();
    setWorkflowKey("");
    setWorkflowDescription("");
    setNewWorkflowName("");
  };

  useEffect(() => {
    if (state.rootItem && loading) {
      setLoading(false);
    }
  }, [state.rootItem, loading, setLoading]);

  const handleUpdateName = (itemId: string, newName: string) => {
    dispatch({ type: "updateName", itemId, name: newName });
    setNeedsSave(true);

    const originalName = originalItemNames[itemId] || "";
    const trimmedName = newName.trim();

    if (unsavedItems.has(itemId)) {
      // If this is an unsaved item, just updating name is fine.
      // The "Save Name" button will appear if name is not empty.
      return;
    }

    // For existing items, check if the name differs from the original
    if (trimmedName.length > 0 && trimmedName !== originalName) {
      setChangedItems((prev) => new Set(prev).add(itemId));
    } else {
      // If user reverts back to original name or clears it out
      setChangedItems((prev) => {
        const updated = new Set(prev);
        updated.delete(itemId);
        return updated;
      });
    }
  };

  const handleSaveItemName = (itemId: string) => {
    // If it was unsaved, remove from unsaved
    if (unsavedItems.has(itemId)) {
      setUnsavedItems((prev) => {
        const updated = new Set(prev);
        updated.delete(itemId);
        return updated;
      });
    }

    // If it was changed, remove from changedItems
    if (changedItems.has(itemId)) {
      setChangedItems((prev) => {
        const updated = new Set(prev);
        updated.delete(itemId);
        return updated;
      });
    }

    // Update the originalItemNames with the new name
    const updatedItems = { ...originalItemNames };
    updatedItems[itemId] = state.items[itemId].name;
    setOriginalItemNames(updatedItems);

    setNeedsSave(true);
  };

  // Save the workflow when state changes if needsSave is true and we have a current workflow
  useEffect(() => {
    if (needsSave && currentWorkflowName && state.rootItem) {
      console.log(
        "State changed, saving workflow:",
        currentWorkflowName,
        state
      );

      // Update originalItemNames for any items that aren't tracked yet
      const newOriginals = { ...originalItemNames };
      for (const [id, item] of Object.entries(state.items)) {
        if (!newOriginals[id]) {
          newOriginals[id] = item.name;
        }
      }
      setOriginalItemNames(newOriginals);

      saveWorkflow(currentWorkflowName);
      setNeedsSave(false);
    }
  }, [state, currentWorkflowName, needsSave, saveWorkflow, originalItemNames]);

  const handleEditClick = (itemId: string) => {
    const item = state.items[itemId];
    if (item) {
      setEditingItem(itemId);
      setEditData({ ...item });
      setIsDialogOpen(true);
    }
  };

  const handleEditChange = (key: string, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      dispatch({ type: "updateItem", itemId: editingItem, data: editData }); // Dispatch update action
      saveWorkflow(currentWorkflowName); // Save the entire workflow
      setEditingItem(null);
      setEditData({});
      setIsDialogOpen(false);
      setNeedsSave(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditData({});
    setIsDialogOpen(false);
  };

  const handleWorkflowKeyChange = (key: string) => {
    setWorkflowKey(key);
    dispatch({ type: "updateWorkflowMetadata", key });
  };

  const handleWorkflowDescriptionChange = (description: string) => {
    setWorkflowDescription(description);
    dispatch({ type: "updateWorkflowMetadata", description });
  };

  const renderItem = (itemId: string): JSX.Element => {
    if (!state.items || !state.items[itemId]) return <></>;
    const item = state.items[itemId];
    const isCollapsed = collapsedItems.has(item.id);

    // Get the available actions based on the current state
    const workflowActions = Object.keys(
      workflow.states[item.currentState]?.on || {}
    );

    // Filter actions based on role and state
    const availableActions =
      user.role === "admin"
        ? workflowActions // Admins see all actions
        : workflowActions.filter((action) =>
            ["submit", "approve", "reject", "archive"].includes(action)
          ); // Users see specific actions

    return (
      <li key={item.id} className="mb-4 p-4 border border-gray-300 rounded-md">
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => toggleCollapse(item.id)}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? "▶" : "▼"}
          </button>
          <p className="text-lg font-semibold">{item.name}</p>
        </div>
        <div className="flex flex-wrap space-x-2 mt-2">
          {/* Render buttons dynamically based on available actions */}
          {availableActions.map((action) => (
            <button
              key={action}
              onClick={() => handleTransition(item.id, action)}
              className={`px-4 py-2 ${
                action === "submit"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : action === "approve"
                  ? "bg-green-500 hover:bg-green-600"
                  : action === "reject"
                  ? "bg-red-500 hover:bg-red-600"
                  : action === "archive"
                  ? "bg-gray-700 hover:bg-gray-800"
                  : "bg-gray-500 hover:bg-gray-600"
              } text-white rounded-lg transition whitespace-nowrap`}
            >
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </button>
          ))}
        </div>
        {!isCollapsed && item.children.length > 0 && (
          <ul className="pl-5 list-disc">
            {item.children.map((childId) => renderItem(childId))}
          </ul>
        )}
      </li>
    );
  };

  useEffect(() => {
    if (state.workflowKey) {
      setWorkflowKey(state.workflowKey);
    }
    if (state.workflowDescription) {
      setWorkflowDescription(state.workflowDescription);
    }
  }, [state.workflowKey, state.workflowDescription]);

  return (
    <div className="p-6 mx-4 bg-slate-200 rounded-xl shadow-md space-y-4 ">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Modify the details for this workflow item.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={editData.name || ""}
                onChange={(e) => handleEditChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current State
              </label>
              <input
                type="text"
                value={editData.currentState || ""}
                onChange={(e) =>
                  handleEditChange("currentState", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restrict "Create New Workflow" based on user role */}
      {user.role === "admin" && !currentWorkflowName && (
        <div>
          <h3 className="block text-lg font-medium text-gray-700 text-center pb-4">
            Create a New Workflow
          </h3>
          <div className="flex items-center space-x-4">
            {/* Workflow Key */}
            <div className="flex-1">
              <label
                htmlFor="workflow-key"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Workflow Key
              </label>
              <input
                id="workflow-key"
                type="text"
                value={workflowKey}
                onChange={(e) => setWorkflowKey(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Enter workflow key"
              />
            </div>

            {/* Workflow Name */}
            <div className="flex-1">
              <label
                htmlFor="workflow-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Workflow Name
              </label>
              <input
                id="workflow-name"
                type="text"
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Enter name for new workflow"
              />
            </div>

            {/* Workflow Description */}
            <div className="flex-1">
              <label
                htmlFor="workflow-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Workflow Description
              </label>
              <textarea
                id="workflow-description"
                value={workflowDescription}
                onChange={(e) => setWorkflowDescription(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Enter workflow description"
              />
            </div>

            {/* Create New Workflow */}
            <div className="flex-shrink-0">
              <button
                onClick={handleCreateNewWorkflow}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition whitespace-nowrap"
              >
                Create New Workflow
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Viewing a Workflow */}
      {currentWorkflowName && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{currentWorkflowName}</h1>
            <div className="flex space-y-4 border space-x-4">
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700">
                  Workflow Key:
                </label>
                <input
                  type="text"
                  value={workflowKey}
                  onChange={(e) => setWorkflowKey(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter workflow key"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter description"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              {user.role === "admin" && (
                <>
                  <button
                    onClick={handleSaveWorkflow}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteWorkflow(currentWorkflowName)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                onClick={handleUnloadWorkflow}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Unload
              </button>
            </div>
          </div>

          {!loading && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Item Name
              </label>
              <input
                ref={inputRef}
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Enter name for new item"
              />
              <button
                onClick={handleAddItem}
                disabled={!newItemName.trim()}
                className={`p-2 rounded-md ${
                  newItemName.trim()
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Add Item
              </button>
            </div>
          )}

          <ul>{state.rootItem && renderItem(state.rootItem)}</ul>
        </>
      )}

      {/* Restrict "Create New Workflow" button */}
      {user.role !== "admin" && !currentWorkflowName && (
        <p className="text-center text-gray-500">
          You do not have permission to create new workflows. Please select an
          existing workflow to view.
        </p>
      )}
    </div>
  );
});

export default WorkflowComponent;
