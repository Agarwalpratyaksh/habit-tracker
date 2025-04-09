import { db } from "@/lib/firebase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { getStreaks } from "@/lib/streaks";
import { celebrateStreak } from "@/lib/celebration";
import HabitCalendar from "./HabitCalendar";

type Habit = {
  id: string;
  habit: string;
  datesCompleted: Record<string, boolean>;
};

function getPastNDates(n: number) {
  const dates = [];
  const today = new Date();
  // Generate dates from n-1 days ago up to today
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

const DAYS_IN_WEEK = 7;
const TOTAL_DAYS_TO_SHOW = 358 + DAYS_IN_WEEK;

function HabitItem({ habit, userId }: { habit: Habit; userId: string }) {
  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.datesCompleted?.[today] || false;
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(habit.habit);
  const gridRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);
  const { currentStreak, longestStreak } = getStreaks(
    habit.datesCompleted || {}
  );
  const milestones = [3, 7, 14, 30];
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ right: true, top: 0 });

  // Get the sequence of dates ending today
  const pastDates = getPastNDates(TOTAL_DAYS_TO_SHOW);

  // --- Calculate Padding for Weekday Alignment ---
  let paddingDays = 0;
  if (pastDates.length > 0) {
    const firstDate = new Date(pastDates[0]);
    paddingDays = firstDate.getDay();
  }
  // Create an array for rendering the padding divs
  const paddingDivs = Array.from({ length: paddingDays });

  useEffect(() => {
    leftScroll();
  }, []);

  // Calculate calendar position
  useEffect(() => {
    if (showCalendar && calendarButtonRef.current) {
      const button = calendarButtonRef.current;
      const buttonRect = button.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      
      // For mobile (smaller screens), position calendar in center
      // For desktop, position it based on button
      if (screenWidth < 640) {
        setCalendarPosition({
          right: false,
          top: buttonRect.height + 8
        });
      } else {
        // Check if there's enough space on the right
        const enoughSpaceOnRight = buttonRect.right + 320 < screenWidth;
        setCalendarPosition({
          right: enoughSpaceOnRight,
          top: buttonRect.height + 8
        });
      }
    }
  }, [showCalendar]);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(event.target as Node) &&
        calendarButtonRef.current && 
        !calendarButtonRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    // Add event listener when calendar is shown
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const leftScroll = () => {
    const grid = gridRef.current;
    if (grid) {
      grid.scrollLeft = grid.scrollWidth;
    }
  };

  const toggleToday = async () => {
    setLoading(true);
    const updatedDate = { ...habit.datesCompleted, [today]: !isDoneToday };
    const { currentStreak } = getStreaks(updatedDate);
    if (milestones.includes(currentStreak)) {
      celebrateStreak(currentStreak);
    }

    const habitRef = doc(db, "user", userId, "habits", habit.id);
    try {
      await updateDoc(habitRef, {
        [`datesCompleted.${today}`]: !isDoneToday,
      });
    } catch (error) {
      console.error("Error updating habit:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDate = async (date: string) => {
    const updated = { ...habit.datesCompleted };
    updated[date] = !updated[date];

    await setDoc(
      doc(db, "user", userId, "habits", habit.id),
      {
        datesCompleted: updated,
      },
      { merge: true }
    );
  };

  const deleteHabit = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete this habit ${habit.habit}`
    );
    if (!confirm) return;

    await deleteDoc(doc(db, "user", userId, "habits", habit.id));
  };

  const handleSave = async () => {
    const habitRef = doc(db, "user", userId, "habits", habit.id);
    await updateDoc(habitRef, {
      habit: newName,
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm mb-6 bg-white">
      {/* Habit Info and Action Button */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border px-2 py-1 rounded text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg text-black">{habit.habit}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              ✏️
            </button>
          </div>
        )}
        <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-4">
          <p>
            🔥 Current Streak: {currentStreak} day
            {currentStreak !== 1 ? "s" : ""}
          </p>
          <p>
            🏆 Longest Streak: {longestStreak} day
            {longestStreak !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          className="text-red-500 hover:text-red-700 text-sm ml-2 border-1 p-2 rounded-full cursor-pointer"
          onClick={deleteHabit}
        >
          🗑️
        </button>

        <div className="relative">
          <button
            ref={calendarButtonRef}
            onClick={() => setShowCalendar(!showCalendar)}
            className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-md hover:bg-purple-200 transition-colors flex items-center gap-1"
          >
            <span>📅</span> Calendar
          </button>
          
          {/* Calendar Popup */}
          <div 
            ref={calendarRef}
            className={`absolute z-10 ${calendarPosition.right ? 'right-0' : 'left-1/2 transform -translate-x-1/2'} sm:left-auto sm:transform-none 
              top-[${calendarPosition.top}px] mt-1 transition-all duration-200 ease-in-out ${
              showCalendar 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
            style={{ top: calendarPosition.top }}
          >
            {showCalendar && (
              <HabitCalendar
                selectedDate={habit.datesCompleted || {}}
                onToggleDate={toggleDate}
              />
            )}
          </div>
        </div>

        <button
          disabled={loading}
          onClick={toggleToday}
          className={`px-4 py-2 rounded font-medium text-white transition-colors duration-150 ease-in-out ${
            isDoneToday
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 hover:bg-gray-500"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "..." : isDoneToday ? "Undo" : "Mark Done"}
        </button>
      </div>

      {/* --- GitHub Style Heatmap Grid with Weekday Alignment --- */}
      <div ref={gridRef} className="overflow-x-auto pb-2 px-1">
        <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
          {/* 1. Render Padding Divs */}
          {paddingDivs.map((_, index) => (
            <div
              key={`pad-${index}`}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm"
            ></div>
          ))}

          {/* 2. Render Actual Date Divs */}
          {pastDates.map((date) => {
            const completed = habit.datesCompleted?.[date] === true;
            const bgColor = completed ? "bg-green-600" : "bg-gray-300";
            const hoverColor = completed
              ? "hover:bg-green-700"
              : "hover:bg-gray-400";
            const isToday = date === today;

            return (
              <div
                key={date}
                title={date}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded transition-colors duration-100 cursor-pointer ${bgColor} ${hoverColor} ${
                  isToday ? "ring-1 ring-black" : ""
                }`}
                onClick={() => toggleDate(date)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HabitItem;