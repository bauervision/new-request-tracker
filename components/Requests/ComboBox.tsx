"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const statuses = [
  {
    value: "New",
    label: "New",
  },
  {
    value: "Awaiting",
    label: "Awaiting Funding",
  },
  {
    value: "Review",
    label: "Review",
  },
  {
    value: "Bid",
    label: "Bid",
  },
  {
    value: "No Bid",
    label: "No Bid",
  },
  {
    value: "Pricing",
    label: "Pricing",
  },
  {
    value: "PCA Review",
    label: "PCA Review",
  },
  {
    value: "Pricing Approved",
    label: "Pricing Approved",
  },
  {
    value: "Proposal Submitted",
    label: "Proposal Submitted",
  },
  {
    value: "Awarded",
    label: "Awarded",
  },
  {
    value: "Invoicing",
    label: "Invoicing",
  },
  {
    value: "Complete",
    label: "Complete",
  },
];

interface ComboboxProps {
  initialStatus?: string;
  onStatusChange?: (status: string) => void;
}

export function Combobox({
  initialStatus = "",
  onStatusChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialStatus);

  React.useEffect(() => {
    setValue(initialStatus);
  }, [initialStatus]);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    if (onStatusChange) {
      onStatusChange(newValue);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? statuses.find((status) => status.value === value)?.label
            : "Select status"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandList>
            <CommandEmpty>No statuses found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={() => handleSelect(status.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === status.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
