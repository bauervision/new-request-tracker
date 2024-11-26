// components/WorkflowEditor.tsx

"use client";

import React, { useState } from "react";
import WorkflowItem from "@/app/request-tracker/workflow/WorkflowItem";
import WorkflowDialog from "./WorkflowDialog";
import { ListItem } from "@/app/request-tracker/workflow/WorkflowItem";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";
import { Button } from "../ui/button";

interface WorkflowEditorProps {
  initialItems: ListItem[];
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ initialItems }) => {
  const [listItems, setListItems] = useState<ListItem[]>(initialItems || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<{
    id: number | null;
    step: string;
    name: string;
    email: string;
  } | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const addItem = (
    parentId: number | null,
    data: { step: string; name: string; email: string }
  ) => {
    const newItem: ListItem = {
      id: Date.now(),
      ...data,
      children: [],
    };

    setListItems((prevItems) => {
      if (parentId === null) {
        return [...prevItems, newItem];
      }

      const addToParent = (items: ListItem[]): ListItem[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newItem],
            };
          }
          if (item.children) {
            return {
              ...item,
              children: addToParent(item.children),
            };
          }
          return item;
        });
      };

      return addToParent(prevItems);
    });

    setIsDialogOpen(false); // Close the dialog after adding the item
  };

  const updateItem = (
    id: number,
    data: { step: string; name: string; email: string }
  ) => {
    setListItems((prevItems) => {
      const updateInTree = (items: ListItem[]): ListItem[] => {
        return items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...data,
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateInTree(item.children),
            };
          }
          return item;
        });
      };

      return updateInTree(prevItems);
    });

    setIsDialogOpen(false); // Close the dialog after updating the item
  };

  const removeItem = (id: number) => {
    setListItems((prevItems) => {
      const removeFromTree = (items: ListItem[]): ListItem[] => {
        return items
          .filter((item) => item.id !== id)
          .map((item) => {
            if (item.children) {
              return {
                ...item,
                children: removeFromTree(item.children),
              };
            }
            return item;
          });
      };

      return removeFromTree(prevItems);
    });
  };

  const openDialogForRootItem = () => {
    setDialogData({ id: null, step: "", name: "", email: "" }); // Set dialog data to empty for new root item
    setIsEditMode(false); // Set mode to add new root item
    setIsDialogOpen(true); // Open the dialog for adding a root item
  };

  const handleDialogSubmit = (data: {
    step: string;
    name: string;
    email: string;
  }) => {
    if (isEditMode && dialogData && dialogData.id !== null) {
      // Edit existing item
      updateItem(dialogData.id, data);
    } else {
      // Add new root item
      addItem(null, data);
    }
  };

  return (
    <div className="p-4">
      <Button
        onClick={openDialogForRootItem}
        className="bg-blue-800 text-white"
      >
        Add Root Item
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay />
        <DialogContent>
          <WorkflowDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSubmit={handleDialogSubmit}
            initialData={
              dialogData || { id: null, step: "", name: "", email: "" }
            }
          />
        </DialogContent>
      </Dialog>
      <ul>
        {listItems.map((item) => (
          <WorkflowItem
            key={item.id}
            item={item}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default WorkflowEditor;
