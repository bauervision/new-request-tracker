"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
  useEffect,
} from "react";
import workflow from "../workflow-engine/workflow";

export interface WorkflowItemState {
  id: string;
  name: string;
  currentState: string;
  children: string[]; // Store child IDs
}

interface WorkflowState {
  rootItem?: string; // Root item ID
  items: Record<string, WorkflowItemState>; // Map of item IDs to their states
  workflowKey?: string; // Workflow key
  workflowDescription?: string; // Workflow description
}

interface InitializeAction {
  type: "initialize";
  itemId: string;
  name: string;
}

interface TransitionAction {
  type: "transition";
  itemId: string;
  action: string;
}

interface InsertAfterAction {
  type: "insertAfter";
  itemId: string;
  newItemId: string;
  name: string;
}

interface DeleteStepAction {
  type: "deleteStep";
  itemId: string;
}

interface RemoveAllBelowAction {
  type: "removeAllBelow";
  itemId: string;
}

interface UpdateName {
  type: "updateName";
  name: string;
  itemId: string;
}

interface LoadWorkflowAction {
  type: "loadWorkflow";
  workflowState: WorkflowState;
}

interface UpdateItemAction {
  type: "updateItem";
  itemId: string;
  data: Partial<WorkflowItemState>;
}

interface UpdateWorkflowMetadataAction {
  type: "updateWorkflowMetadata";
  key?: string;
  description?: string;
}

type WorkflowAction =
  | InitializeAction
  | TransitionAction
  | InsertAfterAction
  | DeleteStepAction
  | RemoveAllBelowAction
  | UpdateName
  | LoadWorkflowAction
  | UpdateItemAction
  | UpdateWorkflowMetadataAction;

interface WorkflowContextType {
  state: WorkflowState;
  dispatch: Dispatch<WorkflowAction>;
  addItem: (name: string) => void;
  saveWorkflow: (name: string) => void;
  loadWorkflow: (workflowName: string) => void;
  deleteWorkflow: (workflowName: string) => void;
  unloadWorkflow: () => void;
  getSavedWorkflows: () => string[];
  setLoading: (isLoading: boolean) => void;
  loading: boolean;
  savedWorkflows: string[];
  currentWorkflowName: string;
  setCurrentWorkflowName: (name: string) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(
  undefined
);

const initialState: WorkflowState = {
  rootItem: undefined,
  items: {},
};

const workflowReducer = (
  state: WorkflowState = { rootItem: undefined, items: {} },
  action: WorkflowAction
): WorkflowState => {
  switch (action.type) {
    case "initialize": {
      const newItem: WorkflowItemState = {
        id: action.itemId,
        name: action.name,
        currentState: workflow.initialState,
        children: [],
      };

      if (!state.rootItem) {
        return {
          rootItem: newItem.id,
          items: {
            [newItem.id]: newItem,
          },
        };
      } else {
        const lastItemId = state.rootItem;
        const lastItem = state.items[lastItemId];

        return {
          ...state,
          items: {
            ...state.items,
            [newItem.id]: newItem,
            [lastItemId]: {
              ...lastItem,
              children: [...lastItem.children, newItem.id],
            },
          },
        };
      }
    }

    case "transition": {
      const currentItem = state.items[action.itemId];
      if (!currentItem) return state;

      const transitions = workflow.states[currentItem.currentState]?.on;
      if (!transitions || !transitions[action.action]) return state;

      return {
        ...state,
        items: {
          ...state.items,
          [action.itemId]: {
            ...currentItem,
            currentState: transitions[action.action],
          },
        },
      };
    }

    case "insertAfter": {
      const parentItem = state.items[action.itemId];
      if (!parentItem) return state;

      const newItem: WorkflowItemState = {
        id: action.newItemId,
        name: action.name,
        currentState: "draft",
        children: [],
      };

      return {
        ...state,
        items: {
          ...state.items,
          [parentItem.id]: {
            ...parentItem,
            children: [...parentItem.children, newItem.id],
          },
          [newItem.id]: newItem,
        },
      };
    }

    case "deleteStep": {
      const { [action.itemId]: _, ...remainingItems } = state.items;

      const removeChildFromParent = (
        items: Record<string, WorkflowItemState>
      ) =>
        Object.entries(items).reduce((acc, [id, item]) => {
          acc[id] = {
            ...item,
            children: item.children.filter(
              (childId) => childId !== action.itemId
            ),
          };
          return acc;
        }, {} as Record<string, WorkflowItemState>);

      return {
        ...state,
        items: removeChildFromParent(remainingItems),
      };
    }

    case "removeAllBelow": {
      const removeChildrenRecursively = (itemId: string) => {
        const item = state.items[itemId];
        if (!item) return;

        item.children.forEach(removeChildrenRecursively);
        delete state.items[itemId];
      };

      removeChildrenRecursively(action.itemId);

      return {
        ...state,
        items: {
          ...state.items,
          [action.itemId]: {
            ...state.items[action.itemId],
            children: [],
          },
        },
      };
    }

    case "loadWorkflow":
      return action.workflowState;

    case "updateName": {
      const currentItem = state.items[action.itemId];
      if (!currentItem) return state;

      return {
        ...state,
        items: {
          ...state.items,
          [action.itemId]: {
            ...currentItem,
            name: action.name,
          },
        },
      };
    }

    case "updateItem": {
      console.log("updateItem called...");
      const currentItem = state.items[action.itemId];
      if (!currentItem) return state;

      return {
        ...state,
        items: {
          ...state.items,
          [action.itemId]: {
            ...currentItem,
            ...action.data,
          },
        },
      };
    }

    case "updateWorkflowMetadata": {
      return {
        ...state,
        workflowKey: action.key ?? state.workflowKey,
        workflowDescription: action.description ?? state.workflowDescription,
      };
    }

    default:
      return state;
  }
};

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(workflowReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [savedWorkflows, setSavedWorkflows] = useState<string[]>([]);
  const [currentWorkflowName, setCurrentWorkflowName] = useState<string>("");

  const addItem = (name: string) => {
    const newId = `item-${Date.now()}`;
    dispatch({ type: "initialize", itemId: newId, name });
  };

  const saveWorkflow = (name: string) => {
    console.log("Saving workflow:", name, state); // Debugging
    const workflowToSave = {
      ...state,
      workflowKey: state.workflowKey,
      workflowDescription: state.workflowDescription,
    };
    localStorage.setItem(`workflow_${name}`, JSON.stringify(workflowToSave));
    setSavedWorkflows(getSavedWorkflows());
  };

  const unloadWorkflow = () => {
    dispatch({ type: "loadWorkflow", workflowState: initialState }); // Reset the workflow state
    setCurrentWorkflowName(""); // Clear the workflow name
  };

  const loadWorkflow = (workflowName: string) => {
    const savedWorkflow = localStorage.getItem(`workflow_${workflowName}`);
    if (savedWorkflow) {
      const workflowState = JSON.parse(savedWorkflow);

      dispatch({
        type: "loadWorkflow",
        workflowState: {
          rootItem: workflowState.rootItem,
          items: workflowState.items,
          workflowKey: workflowState.workflowKey || "", // Load key or default to empty
          workflowDescription: workflowState.workflowDescription || "", // Load description or default to empty
        },
      });
      setLoading(false);
    }
  };

  const deleteWorkflow = (workflowName: string) => {
    localStorage.removeItem(`workflow_${workflowName}`);
    setSavedWorkflows(getSavedWorkflows());
  };

  const getSavedWorkflows = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("workflow_")
    );
    return keys.map((key) => key.replace("workflow_", ""));
  };

  useEffect(() => {
    setSavedWorkflows(getSavedWorkflows());
  }, []);

  return (
    <WorkflowContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        saveWorkflow,
        loadWorkflow,
        deleteWorkflow,
        unloadWorkflow,
        getSavedWorkflows,
        setLoading,
        loading,
        savedWorkflows,
        currentWorkflowName,
        setCurrentWorkflowName,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
};
