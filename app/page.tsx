"use server";

import Logo from "@/components/ui/logo";
import SkeletonImage from "@/components/ui/skeletonimage";

const placeholder =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius";

export default async function Page() {
  return (
    <div className="font-inter flex flex-row gap-10 justify-between">
      {/* Placeholder image */}
      <img
        src="https://picsum.photos/1500/1080"
        className="w-1/2 min-h-20"
        alt="placeholder image"
      />
      <div className="flex flex-col gap-2 w-1/2 justify-end">
        <Logo size="5vw" />
        <p className="text-left font-inter h-auto w-fit mr-16 leading-normal">
          {placeholder}
        </p>
      </div>
    </div>
  );
}
