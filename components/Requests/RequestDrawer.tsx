"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { RequestCarousel } from "./RequestCarousel";
import RequestToast, { showToast } from "./RequestToast";
import RequestNumber from "./requestPages/RequestNumber";

export function RequestDrawer() {
  const [inputValue, setInputValue] = useState("");

  const handleValueChange = async () => {
    console.log("Show toast...");
    showToast("Saving Data...", "info");
    try {
      // Simulate data saving
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setInputValue("value");
      showToast("Save Success", "success");
    } catch (error: any) {
      showToast(`Save Error: ${error.message}`, "error");
    }
  };

  return (
    <Drawer>
      <RequestToast />
      <DrawerTrigger asChild>
        <Button variant="outline" className="bg-blue-800 text-white">
          Add New Request
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-5xl h-[500px] ">
          <DrawerHeader>
            <DrawerTitle>New Request</DrawerTitle>
          </DrawerHeader>
          <RequestNumber />
          <RequestCarousel />

          <DrawerFooter>
            <div className="container flex flex-row">
              <Button
                onClick={handleValueChange}
                className="mx-auto w-full max-w-60"
              >
                Save Current
              </Button>
              <DrawerClose asChild>
                <Button className="mx-auto w-full max-w-60">Submit</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline" className="mx-auto w-full max-w-60">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
