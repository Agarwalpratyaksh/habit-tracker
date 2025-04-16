import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
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
import { Check, LucideProps } from "lucide-react";
import HeatMap from "./HeatMap";
import HabitInfo from "./HabitInfo";

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

function HabitItem({ habit, userId }: { habit: Habit; userId: string }) {
  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.datesCompleted?.[today] || false;
  const [loading, setLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const milestones = [3, 7, 14, 30];

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

  return (
    <div className={`md:px-4 pt-2`}>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {habitIcon && (
            <div className={`border p-2 rounded-md ${habitColor?.light}`}>
              {" "}
              <habitIcon.Icon />{" "}
            </div>
          )}
          <h2 className="font-semibold text-lg ">{habit.habit}</h2>
        </div>

        <div className="flex gap-4">
          <div
            className={`${habitColor?.light} rounded-md flex items-center px-3 hover:bg-accent `}
          >
            <HabitInfo habit={habit} userId={userId} />
          </div>

          <button
            disabled={loading}
            onClick={toggleToday}
            className={`p-2 rounded-lg font-medium text-white transition-colors duration-150 ease-in-out ${
              isDoneToday
                ? `${habitColor?.value} hover:${habitColor?.medium}`
                : `${habitColor?.light} hover:${habitColor?.medium}`
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "..." : isDoneToday ? <Check /> : <Check />}
          </button>
        </div>
      </div>

      <div className="">
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
    </div>
  );
}

export default HabitItem;
