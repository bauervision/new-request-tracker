"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { RequestCarousel } from "./RequestCarousel";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function RequestDrawer() {
  //   const [goal, setGoal] = React.useState(350);

  //   function onClick(adjustment: number) {
  //     setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  //   }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add New Request</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-5xl h-[500px]">
          <DrawerHeader>
            <DrawerTitle>New Request</DrawerTitle>
            <DrawerDescription>Create a new request</DrawerDescription>
          </DrawerHeader>

          <RequestCarousel />

          <DrawerFooter>
            <div className="container flex flex-row">
              <Button className="mx-auto w-full max-w-60">Submit</Button>
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
