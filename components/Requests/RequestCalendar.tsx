"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

interface CalendarData {
  label: string;
  date?: Date;
}
interface CalendarProps {
  data: CalendarData;
}

export function RequestCalendar({ data }: CalendarProps) {
  const [date, setDate] = useState("");

  const handleChange = (event: any) => {
    setDate(event.target.value);
  };
  return (
    <div>
      <Label>{data.label}</Label>
      <div>
        <input type="date" value={date} onChange={handleChange} />
      </div>
    </div>
  );
}
