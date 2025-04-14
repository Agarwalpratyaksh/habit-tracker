import React from 'react'
import { Habit, HabitColor } from './HabitItem';
import  { Tooltip } from 'react-tooltip';



type Props = {
  gridRef: React.Ref<HTMLDivElement> | undefined;
  paddingDivs: Array<number|undefined> | unknown[];
  pastDates:string[];
  today: string;
  toggleDate : (date:string)=> void;
  habit:Habit;
  habitColor: HabitColor|undefined





}

function HeatMap({gridRef,paddingDivs,pastDates,today,habit,habitColor}:Props) {


  return (
    <div ref={gridRef} className="overflow-x-auto pt-1 pb-2 px-1 no-scrollbar">
        <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
          {/* 1. Render Padding Divs */}
          {paddingDivs.map((_, index) => (
            <div
              key={`pad-${index}`}
              className="w-2 h-2 sm:w-4 sm:h-4 rounded-sm"
            ></div>
          ))}

          {/* 2. Render Actual Date Divs */}
          {pastDates.map((date) => {
            const completed = habit.datesCompleted?.[date] === true;
            const bgColor = completed ? habitColor?.value : habitColor?.light;
            const hoverColor = completed
              ? "hover:bg-gray-500"
              : "hover:bg-gray-400";
            const isToday = date === today;

            return (
              <div
                key={date}
                title={date}
                className={`w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-xs sm:rounded transition-colors duration-100 cursor-pointer ${bgColor} ${hoverColor} ${
                  isToday ? "ring-1 ring-black dark:ring-white" : ""
                }`}
             
                data-tooltip-id="my-tooltip" data-tooltip-content={date}
              ></div>
            );
          })}
          <Tooltip id="my-tooltip" />
        </div>
      </div>
  )
}

export default HeatMap