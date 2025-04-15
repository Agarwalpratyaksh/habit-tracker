"use client"; // Required for Aceternity components

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/aceternity/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { MoveRight } from "lucide-react";

// Placeholder Heatmap component/image
const PlaceholderHeatmap = () => (
  <div className="w-full max-w-3xl p-2 mx-auto rounded-lg shadow-xl bg-white dark:bg-zinc-900 aspect-[2/1] overflow-hidden">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(12px,1fr))] gap-1">
        {/* Generate dummy heatmap squares */}
        {Array.from({ length: 150 }).map((_, i) => {
            const opacity = Math.random();
            const bgColor = `rgba(34, 197, 94, ${opacity})`; // Example green color
            return (
                <div
                    key={i}
                    className="aspect-square rounded-[2px]"
                    style={{ backgroundColor: opacity > 0.1 ? bgColor : 'var(--color-canvas-subtle, #f6f8fa)', /* Match GitHub style */ }}
                ></div>
            );
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Your consistency at a glance</p>
  </div>
);


export function HeroSection() {
  return (
    <section className="w-full py-20 ">
      <HeroHighlight containerClassName="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
               {/* Aceternity HeroHighlight */}
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none !leading-tight">
                Visualize Your Consistency.
                <Highlight className="text-black dark:text-white">
                  Build Habits That Stick.
                </Highlight>
              </h1>
              {/* Aceternity TextGenerateEffect */}
              <TextGenerateEffect
                 words="Track your progress with intuitive heatmaps and watch your habits grow stronger every day. Simple, visual, effective."
                 className="max-w-[600px] text-muted-foreground md:text-xl !text-left !mt-4" // Adjust default centering
              />
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started Free
                  <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          {/* Replace with a better visual if available */}
          <div className="flex items-center justify-center">
             <PlaceholderHeatmap />
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
}