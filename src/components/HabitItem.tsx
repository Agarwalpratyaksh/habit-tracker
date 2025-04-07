import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";


type Habit = {
  id: string;
  habit: string;
  datesCompleted: Record<string, boolean>;
};

function HabitItem({ habit, userId }: { habit: Habit; userId: string }) {
  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.datesCompleted?.[today] || false;

  const [loading, setLoading] = useState(false);

  const toogleToday = async () => {
    setLoading(true);
    const habitRef = doc(db, "user",userId, "habits", habit.id);
    await updateDoc(habitRef, {
      [`datesCompleted.${today}`]: !isDoneToday,
    });

    setLoading(false);
  };

  return (
    <div className="p-3 border rounded flex justify-between items-center">
      {/* <div>
        <h3 className="text-lg font-medium">{habit.habit}</h3>
        <p className="text-sm text-gray-600">
          {isDoneToday ? "Done today ✅" : "Not done yet"}
        </p>
      </div> */}
      
      <button
        disabled={loading}
        onClick={toogleToday}
        className={`px-3 py-1 rounded text-white ${
          isDoneToday ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        {isDoneToday ? "Undo" : "Mark Done"}
      </button>
    </div>
  );
}

export default HabitItem;
