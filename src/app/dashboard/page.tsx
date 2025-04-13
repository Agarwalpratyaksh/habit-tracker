"use client";
import { useAuth } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import firebase, { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { collection, onSnapshot } from "firebase/firestore";
import HabitItem from "@/components/HabitItem";

import AddHabitModal from "@/components/AddHabitModal";
import HNavbar from "@/components/NavBar";

const auth = getAuth(firebase);

type Habit = {
    id: string,
    habit: string,
    datesCompleted: Record<string,boolean>,
    color: string,
    icon: string
}

function Dashboard() {

    const [habits,setHabits] = useState<Habit[]>([])
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  //fetch the habit from firebase in realtime
useEffect(()=>{
    if(!user) return;
    const habitRef = collection(db, "user", user?.uid, "habits");

    const unsubscribe = onSnapshot(habitRef,(snapShot)=>{
        const data = snapShot.docs.map((h)=>({
            id: h.id,
            ...h.data()
        })) as Habit[]

        setHabits(data)
        
        console.log(data)
        
    })
},[user])


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

        <HNavbar />


      Dashboard
      <div>
        <button className="bg-blue-400 px-5 py-2 rounded-4xl" onClick={logout}>
          Logout
        </button>
      </div>
      <div>Welcom: {user?.email}</div>
      <div>
      </div>
      <div>
        <AddHabitModal user={user}/>
      </div>
      <div>List of all the habits
        
        
        <div className="lg:mx-48">

        
        {habits.map((habit:Habit) => (

            
              <HabitItem key={habit.id} habit={habit} userId={user?.uid} />
            
          
        ))}
      </div>
        </div>

{/* <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Habit Tracker</h1>
      
     
     <HabitHeatmapContainer userId={user?.uid} habits={habits} loading={loading}/>
    </div> */}
      
    </div>
  );
}

export default Dashboard;
