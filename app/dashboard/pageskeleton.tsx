import { Skeleton } from "@/components/ui/skeleton";

export type Artwork = {
  name: string;
  artist: string;
  medium: string;
  creationDate: Date;
  description: string;
  dimensions: {
    h: number;
    w: number;
    d?: number;
  };
  image: URL;
  id: string;
};

export default function PageSkeleton() {
  return (
    <div className="flex flex-col gap-40 flex-1">
      <div className="w-full flex flex-row gap-20">
        <Skeleton className="aspect-[25/18] w-1/2" />
        <div className="flex flex-col gap-2 justify-end w-1/2 pr-30">
          <Skeleton className="h-[5rem] w-[70%]" />
          <Skeleton className="h-[3rem] w-[40%]" />
          <Skeleton className="h-[3rem] w-[60%]" />
        </div>
      </div>

      <div className="flex flex-col gap-14 px-40">
        <span className="text-5xl font-roboto font-medium">Artworks</span>
        <div className="grid grid-cols-[repeat(auto-fit,30rem)] justify-center gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArtworkSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtworkSkeleton() {
  return (
    <div className="flex flex-col justify-between aspect-[1/1]">
      {/* using <img> as placeholder for now, switch to next/image once actually hooked up to the blob storage */}
      <Skeleton className="w-full h-2/3" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[2rem] w-[70%]" />
        <Skeleton className="h-[1rem] w-[40%]" />
      </div>
      <Skeleton className="p-6 h-[3.5rem] w-full font-bold mx-auto" />
    </div>
  );
}
