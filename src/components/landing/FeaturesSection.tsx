"use client"; // Required for Aceternity components

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { IconChartDots3, IconPalette, IconCheck, IconCalendarStats, IconTargetArrow } from "@tabler/icons-react"; // Example icons



// Placeholder Visual Component for Bento Grid Items
const FeatureVisual = ({ type }: { type: string }) => {
    // In a real app, these would be more sophisticated images/SVGs/mini-components
    const styles = "flex items-center justify-center h-full w-full bg-gradient-to-br from-muted via-background to-muted rounded-lg min-h-[150px] text-muted-foreground";
    if (type === 'heatmap') return <div className={styles}><IconCalendarStats size={48} stroke={1.5} /></div>;
    if (type === 'simple-ui') return <div className={styles}><IconCheck size={48} stroke={1.5} /></div>;
    if (type === 'streak') return <div className={styles}><IconTargetArrow size={48} stroke={1.5} /></div>;
    if (type === 'palette') return <div className={styles}><IconPalette size={48} stroke={1.5} /></div>;
    return <div className={styles}></div>;
};

// Example Feature Items
const features = [
    {
      title: "At-a-Glance Heatmap",
      description: "Instantly visualize your streaks, patterns, and consistency across all your habits.",
      header: <FeatureVisual type="heatmap" />,
      className: "md:col-span-2", // Make this one wider
      icon: <IconCalendarStats className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Simple & Focused Tracking",
      description: "Mark habits complete with a single click. No clutter, just effective tracking.",
      header: <FeatureVisual type="simple-ui" />,
      className: "md:col-span-1",
      icon: <IconCheck className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Stay Motivated",
      description: "Build momentum by tracking current and longest streaks for each habit.",
      header: <FeatureVisual type="streak" />,
      className: "md:col-span-1", 
      icon: <IconTargetArrow className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Personalize Your View",
      description:
        "Choose custom colors and icons for your habits to make the tracker truly yours.",
      header: <FeatureVisual type="palette" />,
      className: "md:col-span-2",
      icon: <IconPalette className="h-4 w-4 text-neutral-500" />,
    },
  ];



export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose HabitGrid?</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Focus on what matters: building consistency. Our visual approach makes tracking intuitive and motivating.
          </p>
        </div>
        {/* Aceternity BentoGrid */}
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
          {features.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
              // Wrap item content with BackgroundGradient for effect
              contentWrapper={(content) => (
                <BackgroundGradient containerClassName="rounded-xl h-full" className="rounded-xl bg-background h-full">
                  {content}
                </BackgroundGradient>
              )}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

// Make sure BentoGridItem is adapted to accept contentWrapper prop or integrate BackgroundGradient inside it.
// If BentoGridItem doesn't support contentWrapper, apply BackgroundGradient within the `header` or structure manually.
// Example modification to BentoGridItem if needed:
/*
export const BentoGridItem = ({ ..., children, contentWrapper }) => {
  const content = (
     <div className={cn(...) // Original content div}>
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          {icon}
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
     </div>
  );
  return contentWrapper ? contentWrapper(content) : content;
};
*/