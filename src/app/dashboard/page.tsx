"use client";
import { useAuth } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import firebase, { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { collection, onSnapshot } from "firebase/firestore";
import HabitItem, { HabitColor } from "@/components/HabitItem";

import AddHabitModal from "@/components/AddHabitModal";
import HNavbar from "@/components/NavBar";
import { NewNavbar } from "@/components/NewNavbar";
import { colorOptions } from "@/lib/exportedData";

const auth = getAuth(firebase);

type Habit = {
  id: string;
  habit: string;
  datesCompleted: Record<string, boolean>;
  color: string;
  icon: string;
};

function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  //fetch the habit from firebase in realtime
  useEffect(() => {
    if (!user) return;
    const habitRef = collection(db, "user", user?.uid, "habits");

    const unsubscribe = onSnapshot(habitRef, (snapShot) => {
      const data = snapShot.docs.map((h) => ({
        id: h.id,
        ...h.data(),
      })) as Habit[];

      setHabits(data);

      console.log(data);
    });
  }, [user]);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div>
      <HNavbar logout={logout} />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-3">
        <div className="flex justify-between items-center lg:my-6 my-4 mb-5">
          <h1 className="text-2xl font-bold">Your Habits</h1>
          <AddHabitModal user={user} />
        </div>
        
        <div className="space-y-4">
          {habits.map((habit: Habit) => {
            const habitColor: HabitColor | undefined = colorOptions.find(
              (color) => color.name == habit.color
            );

            return (
              <div 
                key={habit.habit} 
                className={`p-4 border ${habitColor?.border} rounded-xl shadow-sm`}
              >
                <HabitItem key={habit.id} habit={habit} userId={user?.uid} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

}

export default Dashboard;
