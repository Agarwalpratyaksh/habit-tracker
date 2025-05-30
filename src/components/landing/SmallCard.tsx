import { LucideProps } from "lucide-react";
import React, { RefAttributes, ForwardRefExoticComponent } from "react";

type Prop = {
  Logo: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  heading: string;
  content: string;
};

function SmallCard({ Logo, heading, content }: Prop) {
  return (
    <div className="flex justify-center items-start flex-col gap-3">
      <div className="text-black dark:text-white bg-black/5 dark:bg-white/5 p-3 border-1  border-black/20 dark:border-white/20 rounded-xl">
        {Logo && <Logo size={30}  />}
      </div>
      <div className="font-bold text-xl">{heading}</div>
      <div className="text-base">{content}</div>
    </div>
  );
}

export default SmallCard;
