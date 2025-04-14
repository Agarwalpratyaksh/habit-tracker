"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HabitColor } from "./HabitItem";

type Props = {
  selectedDate: Record<string, boolean>;
  onToggleDate: (dateStr: string) => void;
  habitColor: HabitColor|undefined;
};

export default function HCalendar({
  selectedDate,
  onToggleDate,
  habitColor,
}: Props) {
  // Filter only the selected dates
  const selected = Object.entries(selectedDate)
    .filter(([_, isSelected]) => isSelected)
    .map(([dateStr]) => {
      // Create proper Date objects in local timezone
      const date = new Date(dateStr);
      // Handle timezone offset to ensure correct day display
      return date;
    });

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    // Format date consistently to match the format used in the habit tracker
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    onToggleDate(dateStr);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CalendarIcon />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="multiple"
          selected={selected}
          onDayClick={handleSelect}
          defaultMonth={new Date()}
          disabled={{ after: new Date(), before: new Date(0) }}
          showOutsideDays
          fixedWeeks
          classNames={{
            day_selected: `${habitColor?.light} rounded-full  `,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
