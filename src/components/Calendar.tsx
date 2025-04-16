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
  habitColor: HabitColor | undefined;
};

export default function HCalendar({
  selectedDate,
  onToggleDate,
  habitColor,
}: Props) {
  const selected = Object.entries(selectedDate)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, isSelected]) => isSelected)
    .map(([dateStr]) => {
      const date = new Date(dateStr);
      return date;
    });

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

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
