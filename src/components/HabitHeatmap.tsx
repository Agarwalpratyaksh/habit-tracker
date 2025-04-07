"use client"
import React from "react";
import CalendarHeatmap, { TooltipDataAttrs } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format, subDays, parse, isValid } from "date-fns";
import { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";

type Habit = {
  id: string;
  habit: string;
  datesCompleted: Record<string, boolean>;
};

type HeatmapValue = {
  date: Date;
  count: number;
};

interface HabitHeatmapProps {
  habit: Habit;
}

const HabitHeatmap: React.FC<HabitHeatmapProps> = ({ habit }) => {
  // Get current date and date from 365 days ago
  const today = new Date();
  const startDate = subDays(today, 365);

  // Transform the datesCompleted object into an array of objects for the heatmap
  const getValues = (): HeatmapValue[] => {
    return Object.entries(habit.datesCompleted || {})
      .filter(([dateStr, completed]) => completed) // Only include completed dates
      .map(([dateStr]) => {
        // Parse the date string (format: YYYY-MM-DD)
        const date = parse(dateStr, "yyyy-MM-dd", new Date());
        return isValid(date) ? { date, count: 1 } : null;
      })
      .filter((item): item is HeatmapValue => item !== null); // Filter out any invalid dates
  };

  // Custom tooltip to show the date and completion status
 

  // Calculate the color based on the count value (in this case, only 0 or 1)
  const getClassForValue = (
    value: ReactCalendarHeatmapValue<Date> | undefined
  ) => {
    if (!value || value.count === 0) {
      return "color-empty";
    }
    return "color-filled";
  };

  return (
    <div className="habit-heatmap">
      <h3 className="text-lg font-medium mb-2">{habit.habit}</h3>
      <div className="calendar-heatmap-container">
        <style jsx>{`
          .calendar-heatmap-container {
            overflow-x: auto;
          }
          :global(.react-calendar-heatmap) {
            width: 100%;
            min-width: 730px;
          }
          :global(.react-calendar-heatmap .color-empty) {
            fill: #ebedf0;
          }
          :global(.react-calendar-heatmap .color-filled) {
            fill: #39d353;
          }
          :global(.react-calendar-heatmap rect:hover) {
            stroke: #555;
            stroke-width: 1px;
          }
        `}</style>
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={getValues()}
          classForValue={getClassForValue}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) return { "data-tooltip-content": "No activity","data-tooltip-id":"my-tooltip" };
            return {
              "data-tooltip-content": `${format(value.date, "MMM d, yyyy")}: Completed`,
              "data-tooltip-id":"my-tooltip"
            } as TooltipDataAttrs;
          }}
          
          showWeekdayLabels={true}
        />
        <Tooltip id="my-tooltip" />
      </div>
    </div>
  );
};

export default HabitHeatmap;
