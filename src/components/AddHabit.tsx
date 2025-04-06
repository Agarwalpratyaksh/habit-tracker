"use client";
import React, { FormEvent, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "firebase/auth";

function AddHabit({ user }: { user: User | null }) {
  const [habitName, setHabitName] = useState("");

  const addHabitInfo = async (e: FormEvent) => {
    e.preventDefault();

    if(!habitName.trim()) return ;
    try {
      if (user == null) return;
      const useHabitRef = collection(db, "user", user?.uid, "habits");
      await addDoc(useHabitRef, {
        habit: habitName,
        createdAt: serverTimestamp(),
        datesCompleted: {},
      });

      console.log("successfully created a habit")
    } catch (error) {
      console.log(error);
    } finally {
      setHabitName("");
    }
  };

  return (
    <form onSubmit={addHabitInfo} className="flex gap-2 mb-6">
      <input
        value={habitName}
        onChange={(e) => {setHabitName(e.target.value)
            console.log(habitName)
        }}
        placeholder="Enter a habit"
        className="flex-1 p-2 border rounded"
        required
      />
      <button className="bg-green-600 text-white px-4 rounded">Add</button>
    </form>
  );
}

export default AddHabit;
