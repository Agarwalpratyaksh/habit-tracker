import { db } from "@/lib/firebase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { getStreaks } from "@/lib/streaks";
import { celebrateStreak } from "@/lib/celebration";
import { colorOptions, iconOptions } from "@/lib/exportedData";
import { LucideProps } from "lucide-react";
import Calendar from "./Calendar";

type Habit = {
  id: string;
  habit: string;
  datesCompleted: Record<string, boolean>;
  color: string;
  icon: string;
};

type HabitIcon = {
  name: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type HabitColor = {
  name: string;
  value: string;
};

function getPastNDates(n: number) {
  const dates = [];
  const today = new Date();
  
  // Generate dates from n-1 days ago up to today (inclusive)
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    // Format consistently to avoid timezone issues
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
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
  const { currentStreak, longestStreak } = getStreaks(
    habit.datesCompleted || {}
  );
  const milestones = [3, 7, 14, 30];

  const habitIcon: HabitIcon | undefined = iconOptions.find(
    (icon) => icon.name == habit.icon
  );

  const habitColor: HabitColor | undefined = colorOptions.find(
    (color) => color.name == habit.color
  );
  const currentHabitColor = habitColor?.value;

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
            {habitIcon && (
              <div className={`border p-2 rounded-md ${currentHabitColor}/25`}>
                {" "}
                <habitIcon.Icon />{" "}
              </div>
            )}
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

      
        <div>
         <Calendar  selectedDate={habit.datesCompleted || {}}
                onToggleDate={toggleDate}/>
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
