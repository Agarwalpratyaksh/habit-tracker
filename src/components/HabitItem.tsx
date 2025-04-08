import { db } from "@/lib/firebase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import React, {  useEffect, useRef, useState } from "react";

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
  const [newName,setNewName] = useState(habit.habit)
  const gridRef = useRef<HTMLDivElement>(null)

  console.log(newName)

  // Get the sequence of dates ending today
  const pastDates = getPastNDates(TOTAL_DAYS_TO_SHOW);

  // --- Calculate Padding for Weekday Alignment ---
  let paddingDays = 0;
  if (pastDates.length > 0) {
    const firstDate = new Date(pastDates[0]);
    // getDay() returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    // This value directly tells us how many empty slots we need before the first day
    // to make it align correctly in the first column (assuming Sunday is the top row).
    paddingDays = firstDate.getDay();
  }
  // Create an array for rendering the padding divs
  const paddingDivs = Array.from({ length: paddingDays });


  useEffect(() => {
    
     leftScroll()
  
    
  }, [])
  
  

  const leftScroll = ()=>{
    console.log("scroll krde")
    const grid = gridRef.current
    if(grid){
      grid.scrollLeft = grid.scrollWidth
    }
  }

  const toggleToday = async () => {
    setLoading(true);
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

  const toogleDate = async (date:string)=>{
    const updated = {...habit.datesCompleted}
    updated[date]= !updated[date]

    console.log(updated)

    await setDoc(doc(db,"user",userId,'habits',habit.id),{
      datesCompleted:updated
    },{merge:true})

  }

  const deleteHabit = async()=>{
    const confirm = window.confirm(`Are you sure you want to delete this habit ${habit.habit}`)
    if(!confirm) return

    await deleteDoc(doc(db,"user",userId,"habits",habit.id))
  }


  const handleSave = async ()=>{
    console.log(newName)
    const habitRef = doc(db,"user",userId,"habits",habit.id)
    await updateDoc(habitRef,{
      habit: newName
    })
    setIsEditing(false)
  }


  return (
    <div className="p-4 border rounded-xl shadow-sm mb-6 bg-white">
      {/* Habit Info and Action Button */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        {/* <div>
          <h3 className="text-lg font-semibold">{habit.habit}</h3>
          <p className="text-xs text-gray-500">
             Tracking last ~{Math.round(TOTAL_DAYS_TO_SHOW/7)} weeks
          </p>
        </div> */}


{/* used for editing habits */}

        {isEditing ? (
  <div className="flex items-center gap-2">
    <input
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      className="border px-2 py-1 rounded text-sm"
      onKeyDown={(e)=>e.key === 'Enter' && handleSave()}
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

        <button className="text-red-500 hover:text-red-700 text-sm ml-2 border-1 p-2 rounded-full cursor-pointer" onClick={()=>{deleteHabit()}}>
        🗑️

        </button>
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

        <button onClick={leftScroll} className="bg-green-700 p-2 border-2 rounded-2xl">Click to scroll</button>
      </div>




      {/* --- GitHub Style Heatmap Grid with Weekday Alignment --- */}
      {/* Add horizontal scrolling for smaller screens */}
      <div ref={gridRef} className="overflow-x-auto pb-2 px-1 ">
       
        <div  className="grid grid-rows-7 grid-flow-col gap-1 w-max">
          {/* 1. Render Padding Divs */}
          {paddingDivs.map((_, index) => (
            <div
              key={`pad-${index}`}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm" // Empty cell, no background
            ></div>
          ))}

          {/* 2. Render Actual Date Divs */}
          {pastDates.map((date) => {
            const completed = habit.datesCompleted?.[date] === true;
            const bgColor = completed ? "bg-green-600 " : "bg-gray-300";
            const hoverColor = completed ? "hover:bg-green-700" : "hover:bg-gray-400";
            const isToday = date === today
            

            return (
              <div
                key={date}
                title={date} // Tooltip showing the date
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded transition-colors duration-100 ${bgColor} ${hoverColor} ${isToday ? 'ring-1  ring-black' : ''}`}
                onClick={()=>{toogleDate(date)}}
              ></div>
            );
          })}
        </div>
      </div>
        {/* Optional: Add Day Labels (Sun-Sat) */}
        {/* You might need absolute positioning or careful flex layout outside the grid div */}
        {/* Example (needs styling):
        <div className="flex flex-col text-xs text-gray-500" style={{ height: 'calc(7 * (1rem + 0.25rem))' }}> // Adjust height based on cell size + gap
            <span>Sun</span> <span className="flex-grow"></span>
            <span>Mon</span> <span className="flex-grow"></span>
             ... etc ...
            <span>Sat</span>
        </div>
       */}
    </div>
  );
}

export default HabitItem;