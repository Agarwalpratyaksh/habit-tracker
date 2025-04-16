"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { iconOptions, colorOptions } from "@/lib/exportedData";
import { db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Plus } from "lucide-react";

import { FormEvent, useState } from "react";

export default function AddHabitModal({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].name);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].name);

  const addHabitInfo = async (e: FormEvent) => {
    e.preventDefault();

    if (!habitName.trim()) return;
    try {
      if (user == null) return;
      const useHabitRef = collection(db, "user", user?.uid, "habits");
      await addDoc(useHabitRef, {
        habit: habitName,
        createdAt: serverTimestamp(),
        datesCompleted: {},
        icon: selectedIcon,
        color: selectedColor,
      });

      console.log("successfully created a habit");
    } catch (error) {
      console.log(error);
    } finally {
      setHabitName("");
      setHabitDescription("");
      setSelectedIcon(iconOptions[0].name);
      setSelectedColor(colorOptions[0].name);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 border-1" variant={"outline"}>
          <Plus className="h-4 w-4" />
          <span>New Habit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Habit</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-mediu">Habit Name</label>
            <Input
              value={habitName}
              placeholder="Coding"
              onChange={(e) => setHabitName(e.target.value)}
              className="text-md"
            />
          </div>
          <div>
            <label className="text-sm font-mediu">Description</label>
            <Input
              value={habitDescription}
              onChange={(e) => setHabitDescription(e.target.value)}
              className="text-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Icon</label>
            <div className="mt-1 grid grid-cols-7 gap-2">
              {iconOptions.map(({ name, Icon }) => (
                <button
                  key={name}
                  onClick={() => setSelectedIcon(name)}
                  className={`text-2xl p-1.5 py-2 border rounded-lg flex justify-center items-center ${
                    selectedIcon === name
                      ? " border-black dark:border-white"
                      : ""
                  }`}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Color</label>
            <div className="grid grid-cols-8 gap-2 mt-1">
              {colorOptions.map(({ name, value }) => (
                <button
                  key={name}
                  onClick={() => setSelectedColor(name)}
                  className={`size-7 rounded-full ${value} ${
                    selectedColor === name
                      ? "ring-2 ring-black dark:ring-white"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={addHabitInfo}
            disabled={!habitName.trim()}
            className="w-full mt-2"
          >
            Create Habit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
