'use client';

import React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

type Props = {
  datesCompleted: Record<string, boolean>;
};

export default function HabitHeatmap({ datesCompleted }: Props) {
  // Create an array of the last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 29);

  // Convert your object into an array of values the heatmap understands
  const values = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(endDate.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    return {
      date: dateString,
      count: datesCompleted[dateString] ? 1 : 0,
    };
  }).reverse(); // reverse to start from oldest to newest

  return (
    <div>
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return 'color-empty';
          }
          return 'color-filled';
        }}
       
        showWeekdayLabels={true}
      />
  
    </div>
  );
}
