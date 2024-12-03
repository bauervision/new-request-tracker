// components/TaskSheet.tsx

"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const TaskSheet: React.FC = () => {
  const [tasks, setTasks] = useState<
    { id: number; name: string; details: string }[]
  >([
    { id: 1, name: "Task 1", details: "Details for Task 1" },
    { id: 2, name: "Task 2", details: "Details for Task 2" },
    { id: 3, name: "Task 3", details: "Details for Task 3" },
    { id: 4, name: "Task 4", details: "Details for Task 4" },
    { id: 5, name: "Task 5", details: "Details for Task 5" },
    { id: 6, name: "Task 6", details: "Details for Task 6" },
    { id: 7, name: "Task 7", details: "Details for Task 7" },
    { id: 8, name: "Task 8", details: "Details for Task 8" },
    { id: 9, name: "Task 9", details: "Details for Task 9" },
    // Add more tasks as needed
  ]);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleTaskClick = (taskId: number) => {
    setExpandedTaskId((prev) => (prev === taskId ? null : taskId));
  };

  return (
    <div className="pb-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button>You have {tasks.length} Pending Actions</Button>
        </SheetTrigger>

        <SheetContent>
          <div className="p-4">
            <h2 className="text-xl font-bold">Your Actions</h2>
            <div
              className="mt-4"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li key={task.id} className="border p-2 rounded">
                    <Button
                      variant="outline"
                      onClick={() => handleTaskClick(task.id)}
                    >
                      {task.name}
                    </Button>
                    {expandedTaskId === task.id && (
                      <div className="mt-2 p-2 border rounded">
                        <h3 className="text-lg font-bold">{task.name}</h3>
                        <p>{task.details}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <SheetClose asChild>
              <Button className="mt-4">Close</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TaskSheet;
