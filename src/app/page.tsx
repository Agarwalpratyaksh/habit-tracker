import { LCard } from "@/components/landing/Card";
import { LNavbar } from "@/components/landing/Navbar";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import screenshot from "../../public/screenshot-portrait-black.png";
import { Flame,  NotebookPen, PartyPopper } from "lucide-react";
import Image from "next/image";
import SmallCard from "@/components/landing/SmallCard";
import { Grid, Edit, Award, Moon, Calendar } from "lucide-react";

export default function LandingPage() {
  const pastDates = [];
  for (let i = 0; i < 259; i++) {
    pastDates[i] = i;
  }

  const activeDays = Array.from({ length: 190 }, () =>
    Math.floor(Math.random() * 259)
  );

  const featureIcons = [
    {
      name: "Visual Habit Tracking",
      description:
        "Monitor your daily habits with a clean, tile-based heat-map. Fill in the boxes, build your streak, and stay motivated through the grid.",
      icon: Grid, // Represents a grid view or dashboard
    },
    {
      name: "Quick Customization",
      description:
        "Add habits in seconds — set a name, pick an emoji icon, choose a theme color, and start tracking right away.",
      icon: Edit, // Represents editing or customization
    },
    {
      name: "Motivating Streaks",
      description:
        "Get rewarded for consistency. Watch your streak grow and hit milestone goals like 3, 7, 14, and 30 days — with confetti to celebrate your wins.",
      icon: Award, // Represents rewards or achievements
    },
    {
      name: "Light & Dark Themes",
      description:
        "Choose the look that fits your vibe. Supports dark mode, light mode, and auto-adjusts to your system settings.",
      icon: Moon, // Represents night mode or theme toggle
    },
    {
      name: "Interactive Calendar",
      description:
        "Need to backfill or update your progress? Use the calendar to tap any date and mark your completions — it's that easy.",
      icon: Calendar, // Represents a calendar view
    },
  ];

  const redirectLogin = () => {};
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <LNavbar />

      <div className="mt-36 text-center">
        <div className="min-h-72 flex justify-center items-center flex-col text-7xl font-extrabold gap-4 text-center py-6">
          <div className="flex flex-col gap-2">
            <div>
              Ship your <span className="text-[#444DFF]">habits</span> like
            </div>
            <div>you ship your code</div>
          </div>
          <div className="md:px-24 xl:px-96 mb-6">
            <TextGenerateEffect
              className="text-center font-thin text-xs"
              words="Track everything you care about in one place. Simple, visual habit tracking that keeps you going."
              duration={1}
            />
          </div>




          <div className="my-auto flex items-center">
            <Link href={"/login"} className="rounded-xl">
              <Button className="bg-[#444DFF] hover:bg-[#444DFF]/90 text-white text-xl px-8 py-6 rounded-xl">
                Get started
              </Button>
            </Link>
          </div>



        </div>
      </div>

      <div className="py-12 flex justify-center">
        <div className="overflow-x-auto pt-1 pb-2 px-1 no-scrollbar">
          <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
            {pastDates.map((date) => {
              const isActive = activeDays.includes(date);
              return (
                <div
                  key={date}
                  className={`w-2.5 h-2.5 sm:w-6 sm:h-6 rounded-xs sm:rounded transition-colors duration-100 cursor-pointer ${
                    isActive ? "bg-[#444DFF]" : "bg-[#444DFF]/25"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-6 flex justify-center gap-8 items-center xl:px-24">
        <LCard
          icon={<NotebookPen className="text-green-600 size-14" />}
          content="Easily add, edit, and delete habits with a simple interface. Customize them with icons and colors, and manage everything with just a few clicks."
        />
        <LCard
          icon={<PartyPopper className="text-blue-600 size-14" />}
          content="Celebrate consistency with streaks and confetti on milestones, keeping you motivated with visual rewards as you hit your habit goals."
        />
        <LCard
          icon={<Flame className="text-yellow-600 size-14" />}
          content="Track progress with a colorful heatmap that shows your streaks over time. Stay on track anywhere with a mobile-friendly design."
        />
      </div>
      <div className="lg:pl-24 lg:pr-6 py-12 flex">
        <Image src={screenshot} height={1024} alt="Dummy Image" />
        <div className="pt-24 flex-1">
          <div className="text-center text-6xl font-extrabold flex flex-col gap-3">
            <span>Track Habits Visually</span>

            <span>Anytime, Anywhere</span>
          </div>

          <div className="py-8 text-center font-thin text-lg">
            Stay consistent on the go with our mobile-friendly habit tracker.
            Easily mark your progress, view streaks, and track habits with a
            clean, GitHub-style heatmap — right from your phone.
          </div>

          <div className="grid grid-cols-2 gap-8 px-12 ">
            {featureIcons.map((featured, index) => {
              return (
                <SmallCard
                  key={index}
                  Logo={featured.icon}
                  heading={featured.name}
                  content={featured.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
