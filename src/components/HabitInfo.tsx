import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/habit-dailog";
import { Habit } from "./HabitItem";
import ModalHabit from "./ModalHabit";
import { Info } from "lucide-react";

export default function HabitInfo({
  habit,
  userId,
}: {
  habit: Habit;
  userId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Info size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-0.5rem)] sm:max-w-[1024px]">
        <DialogTitle></DialogTitle>

        <div className="overflow-x-scroll no-scrollbar">
          <ModalHabit habit={habit} userId={userId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
