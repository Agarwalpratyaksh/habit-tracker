import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Prop = {
    icon:  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    content: string
}

export function LCard({icon,content}:Prop) {
  return (
    <CardSpotlight className=" h-72 flex flex-col justify-center items-center text-center gap-6">
      <p className="text-xl font-bold relative z-10 my-2 text-white">
        {icon}
      </p>
      <div className="text-neutral-200 mt-4 text-xl z-20">
      {content}
        
      </div>
     
    </CardSpotlight>
  );
}

