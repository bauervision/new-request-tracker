"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
  useCallback,
} from "react";
import workflow from "../workflow-engine/workflow";

export interface WorkflowItemState {
  id: string;
  name: string;
  currentState: string;
  children: WorkflowItemState[];
}

interface WorkflowState {
  rootItem?: WorkflowItemState;
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

interface LoadWorkflowAction {
  type: "loadWorkflow";
  workflowState: WorkflowState;
}

type WorkflowAction =
  | InitializeAction
  | TransitionAction
  | InsertAfterAction
  | DeleteStepAction
  | RemoveAllBelowAction
  | LoadWorkflowAction;

interface WorkflowContextType {
  state: WorkflowState;
  dispatch: Dispatch<WorkflowAction>;
  addItem: (name: string) => void;
  saveWorkflow: (name: string) => void;
  loadWorkflow: (workflowName: string) => void;
  deleteWorkflow: (workflowName: string) => void;
  getSavedWorkflows: () => string[];
  setLoading: (isLoading: boolean) => void;
  loading: boolean;
  savedWorkflows: string[];
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(
  undefined
);

const workflowReducer = (
  state: WorkflowState,
  action: WorkflowAction
): WorkflowState => {
  switch (action.type) {
    case "initialize":
      if (!state.rootItem) {
        return {
          rootItem: {
            id: action.itemId,
            name: action.name,
            currentState: workflow.initialState,
            children: [],
          },
        };
      } else {
        const addItemToLastChild = (
          item: WorkflowItemState
        ): WorkflowItemState => {
          if (item.children.length === 0) {
            return {
              ...item,
              children: [
                ...item.children,
                {
                  id: action.itemId,
                  name: action.name,
                  currentState: workflow.initialState,
                  children: [],
                },
              ],
            };
          } else {
            return {
              ...item,
              children: item.children.map((child, index) =>
                index === item.children.length - 1
                  ? addItemToLastChild(child)
                  : child
              ),
            };
          }
        };
        return {
          rootItem: addItemToLastChild(state.rootItem),
        };
      }

    case "transition":
      const updateItemState = (item: WorkflowItemState): WorkflowItemState => {
        if (item.id === action.itemId) {
          const { currentState } = item;
          const transitions = workflow.states[currentState]?.on;

          if (transitions && transitions[action.action]) {
            return { ...item, currentState: transitions[action.action] };
          }
        }
        return {
          ...item,
          children: item.children.map(updateItemState),
        };
      };
      return {
        rootItem: state.rootItem ? updateItemState(state.rootItem) : undefined,
      };

    case "insertAfter":
      const addItemAfter = (item: WorkflowItemState): WorkflowItemState => {
        if (item.id === action.itemId) {
          return {
            ...item,
            children: [
              ...item.children,
              {
                id: action.newItemId,
                name: action.name,
                currentState: workflow.initialState,
                children: [],
              },
            ],
          };
        }
        return {
          ...item,
          children: item.children.map(addItemAfter),
        };
      };
      return {
        rootItem: state.rootItem ? addItemAfter(state.rootItem) : undefined,
      };

    case "deleteStep":
      const deleteItem = (
        item: WorkflowItemState
      ): WorkflowItemState | undefined => {
        if (item.id === action.itemId) {
          return undefined;
        }
        return {
          ...item,
          children: item.children
            .map(deleteItem)
            .filter(Boolean) as WorkflowItemState[],
        };
      };
      return {
        rootItem: state.rootItem ? deleteItem(state.rootItem) : undefined,
      };

    case "removeAllBelow":
      const removeChildren = (item: WorkflowItemState): WorkflowItemState => {
        if (item.id === action.itemId) {
          return { ...item, children: [] };
        }
        return {
          ...item,
          children: item.children.map(removeChildren),
        };
      };
      return {
        rootItem: state.rootItem ? removeChildren(state.rootItem) : undefined,
      };

    case "loadWorkflow":
      return action.workflowState;

    default:
      return state;
  }
};

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(workflowReducer, {});
  const [loading, setLoading] = useState(true);
  const [savedWorkflows, setSavedWorkflows] = useState<string[]>([]);

  const addItem = (name: string) => {
    const newId = `item-${Date.now()}`;
    dispatch({ type: "initialize", itemId: newId, name });
  };

  const saveWorkflow = (name: string) => {
    localStorage.setItem(`workflow_${name}`, JSON.stringify(state));
    setSavedWorkflows(getSavedWorkflows());
  };

  const loadWorkflow = (workflowName: string) => {
    const savedWorkflow = localStorage.getItem(`workflow_${workflowName}`);
    if (savedWorkflow) {
      dispatch({
        type: "loadWorkflow",
        workflowState: JSON.parse(savedWorkflow),
      });
      setLoading(false);
      // You may not need to call setSavedWorkflows here unless you want to
      // refresh the list of workflows immediately after loading
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

  return (
    <WorkflowContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        saveWorkflow,
        loadWorkflow,
        deleteWorkflow,
        getSavedWorkflows,
        setLoading,
        loading,
        savedWorkflows,
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
