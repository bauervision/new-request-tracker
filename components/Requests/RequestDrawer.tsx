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

export function RequestDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add New Request</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-5xl h-[500px]">
          <DrawerHeader>
            <DrawerTitle>New Request</DrawerTitle>
            <DrawerDescription>New Request #: 00000001</DrawerDescription>
          </DrawerHeader>

          <RequestCarousel />

          <DrawerFooter>
            <div className="container flex flex-row">
              <Button className="mx-auto w-full max-w-60">Save Current</Button>
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
