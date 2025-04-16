import { db } from "@/lib/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { getStreaks } from "@/lib/streaks";
import { celebrateStreak } from "@/lib/celebration";
import { colorOptions, iconOptions } from "@/lib/exportedData";
import {
  CircleCheck,
  CircleDashed,
  LucideProps,
  Pencil,
  Save,
  Trash2,
  XIcon,
  TrendingUp,
} from "lucide-react";
import Calendar from "./Calendar";
import HeatMap from "./HeatMap";

export type Habit = {
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

export type HabitColor = {
  name: string;
  value: string;
  light: string;
  medium: string;
  border: string;
};

function getPastNDates(n: number) {
  const dates = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }
  return dates;
}

const DAYS_IN_WEEK = 7;
const TOTAL_DAYS_TO_SHOW = 358 + DAYS_IN_WEEK;

function ModalHabit({ habit, userId }: { habit: Habit; userId: string }) {
  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.datesCompleted?.[today] || false;
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(habit.habit);
  const gridRef = useRef<HTMLDivElement>(null);
  const { currentStreak } = getStreaks(habit.datesCompleted || {});
  const milestones = [3, 7, 14, 30]; // Consider making this configurable

  const habitIcon: HabitIcon | undefined = iconOptions.find(
    (icon) => icon.name == habit.icon
  );

  const habitColor: HabitColor | undefined = colorOptions.find(
    (color) => color.name == habit.color
  );

  const pastDates = getPastNDates(TOTAL_DAYS_TO_SHOW);
  let paddingDays = 0;
  if (pastDates.length > 0) {
    const firstDate = new Date(pastDates[0]);
    paddingDays = firstDate.getDay();
  }
  const paddingDivs = Array.from({ length: paddingDays });

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.scrollLeft = grid.scrollWidth;
    }
  }, []);

  const toggleToday = useCallback(async () => {
    setLoading(true);
    const updatedDates = { ...habit.datesCompleted, [today]: !isDoneToday };
    const { currentStreak: newStreak } = getStreaks(updatedDates);

    if (!isDoneToday && milestones.includes(newStreak)) {
      celebrateStreak(newStreak);
    }

    const habitRef = doc(db, "user", userId, "habits", habit.id);
    try {
      await updateDoc(habitRef, {
        [`datesCompleted.${today}`]: !isDoneToday,
      });
    } catch (error) {
      console.error("Error updating habit completion:", error);
    } finally {
      setLoading(false);
    }
  }, [habit.id, userId, habit.datesCompleted, isDoneToday, today, milestones]);

  const toggleDate = useCallback(
    async (date: string) => {
      const currentStatus = habit.datesCompleted?.[date] ?? false;
      const updatedDates = { ...habit.datesCompleted, [date]: !currentStatus };

      const { currentStreak: newStreak } = getStreaks(updatedDates);

      if (!isDoneToday && milestones.includes(newStreak)) {
        celebrateStreak(newStreak);
      }

      const habitRef = doc(db, "user", userId, "habits", habit.id);
      try {
        await updateDoc(habitRef, {
          datesCompleted: updatedDates,
        });
      } catch (error) {
        console.error("Error toggling date:", error);
      }
    },
    [habit.id, userId, habit.datesCompleted]
  );

  const deleteHabit = useCallback(async () => {
    if (
      window.confirm(
        `Are you sure you want to delete the habit "${habit.habit}"?`
      )
    ) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "user", userId, "habits", habit.id));
      } catch (error) {
        console.error("Error deleting habit:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [habit.id, userId, habit.habit]);

  const handleSave = useCallback(async () => {
    if (newName.trim() === habit.habit) {
      setIsEditing(false);
      return;
    }
    if (newName.trim() === "") {
      console.warn("Habit name cannot be empty");
      return;
    }

    setLoading(true);
    const habitRef = doc(db, "user", userId, "habits", habit.id);
    try {
      await updateDoc(habitRef, {
        habit: newName.trim(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating habit name:", error);
    } finally {
      setLoading(false);
    }
  }, [habit.id, userId, newName, habit.habit]);

  if (!habit || !habit.id || !userId) {
    return <div className="p-6 text-center">Loading habit data...</div>;
  }

  const commonButtonStyles =
    "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors";
  const primaryButtonBaseStyles =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-150 ease-in-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-grow">
          {habitIcon && (
            <div
              className={`flex-shrink-0 p-2 rounded-lg border ${habitColor?.border} ${habitColor?.light}`}
            >
              <habitIcon.Icon className="w-5 h-5" />
            </div>
          )}
          {isEditing ? (
            <div className="flex items-center gap-2 flex-grow">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded px-3 py-1.5 text-lg w-full dark:bg-gray-800 dark:border-gray-600"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
              />
              <button
                onClick={handleSave}
                className={commonButtonStyles}
                aria-label="Save name"
              >
                <Save size={20} className="text-green-600" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={commonButtonStyles}
                aria-label="Cancel edit"
              >
                <XIcon size={20} className="text-red-600" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-grow min-w-0">
              <h2
                className="font-semibold text-xl truncate"
                title={habit.habit}
              >
                {habit.habit}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className={commonButtonStyles}
                aria-label="Edit name"
              >
                <Pencil size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Right: Current Streak */}
        {!isEditing && (
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border whitespace-nowrap ${
              habitColor?.border
            } ${currentStreak > 0 ? habitColor?.medium : habitColor?.light}`}
          >
            <TrendingUp size={18} />
            <span className="font-semibold text-sm">
              {currentStreak} Day Streak
            </span>
          </div>
        )}
      </div>

      {/* Heatmap Section */}
      <div className="mt-2">
        <HeatMap
          gridRef={gridRef}
          habit={habit}
          paddingDivs={paddingDivs}
          pastDates={pastDates}
          today={today}
          toggleDate={toggleDate}
          habitColor={habitColor}
        />
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t dark:border-gray-700">
        {" "}
        {/* Added top border */}
        <div className="flex items-center gap-2">
          <button
            onClick={deleteHabit}
            className={`${commonButtonStyles} text-red-600 border-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 dark:border-red-900 border-1`}
            disabled={loading}
            aria-label="Delete habit"
          >
            <Trash2 size={20} />
          </button>
          <button
            className={`${commonButtonStyles} border-1`}
            aria-label="Open calendar view"
          >
            <Calendar
              selectedDate={habit.datesCompleted || {}}
              onToggleDate={toggleDate}
              habitColor={habitColor}
            />
          </button>
        </div>
        <button
          disabled={loading}
          onClick={toggleToday}
          className={`${primaryButtonBaseStyles} ${
            isDoneToday
              ? `${habitColor?.value} text-white hover:opacity-90 dark:text-black` // Ensure contrast on colored background
              : `${habitColor?.light} text-black hover:${habitColor?.medium} dark:text-gray-800 dark:hover:bg-opacity-80`
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </>
          ) : isDoneToday ? (
            <>
              <CircleCheck size={20} /> Marked Done
            </>
          ) : (
            <>
              <CircleDashed size={20} /> Mark as Done
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ModalHabit;
