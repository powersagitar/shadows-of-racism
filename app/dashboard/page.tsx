"use server";

import Button from "@/components/ui/button";
import SkeletonImage from "@/components/ui/skeletonimage";
import EditDialog from "./editdialog";
import { DateTime } from "luxon";

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
  image: string;
  id: string;
};

type UserData = {
  name: string;
  remaining: number;
  items: number;
  artworks: Artwork[];
};

const testArtworks = [
  { name: "Skibidi Toilet", artist: "Mohan Dong" },
  { name: "Fanum Tax", artist: "Paste" },
  { name: "Insanity Maxxing", artist: "fluf" },
  { name: "Skibidi Toilet", artist: "Mohan Dong" },
  { name: "Fanum Tax", artist: "Paste" },
  { name: "Insanity Maxxing", artist: "fluf" },
  { name: "Skibidi Toilet", artist: "Mohan Dong" },
  { name: "Fanum Tax", artist: "Paste" },
  { name: "Insanity Maxxing", artist: "fluf" },
  { name: "Skibidi Toilet", artist: "Mohan Dong" },
  { name: "Fanum Tax", artist: "Paste" },
  { name: "Insanity Maxxing", artist: "fluf" },
];

// simulate fetching delay
const fetchUserData = async (): Promise<UserData> => {
  await new Promise((res) => setTimeout(res, 2000));
  return {
    name: "Mohan Dong",
    remaining: 69,
    items: 10,
    artworks: testArtworks.map((e, i) => ({
      ...e,
      medium: "Example Medium",
      creationDate: new Date("2024-12-11"),
      description: "Lorem ipsum dolor sit amet...",
      dimensions: { h: 6, w: 9, d: 12 },
      image: "https://picsum.photos/1920/1920",
      id: `example-id-${i}`,
    })),
  };
};

const getGreeting = () => {
  const hour = DateTime.now().setZone("America/Toronto").hour;
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default async function Page() {
  const userData = await fetchUserData();
  const greeting = getGreeting();

  return (
    <div className="flex flex-col gap-40 flex-1 cursor-default">
      <div className="w-full flex flex-row gap-20">
        <SkeletonImage
          src="https://picsum.photos/1500/1080"
          className="aspect-[25/18] w-1/2"
          alt="placeholder image"
          useHtmlImg
        />
        <div className="flex flex-col gap-2 justify-end w-1/2 pr-30">
          <span className="text-5xl font-roboto font-bold animate-fade-in">
            {greeting}, {userData.name}
          </span>
          <p className="font-inter my-2 animate-fade-in">
            There are {userData.remaining} days until the exhibition
          </p>
          <p className="font-inter my-2 animate-fade-in">
            You have submitted a total of {userData.items} items
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-14 px-40">
        <span className="text-5xl font-roboto font-medium">Artworks</span>
        <div className="grid grid-cols-[repeat(auto-fit,30rem)] justify-center gap-10">
          <AddArtworkButton />
          {userData.artworks.map((art, i) => (
            <ArtworkItem key={i} artwork={art} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AddArtworkButton() {
  return (
    <EditDialog
      openButton={
        <div className="relative justify-between aspect-[1/1] border-3 border-black">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-l-3 w-0 h-24 border-black" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-t-3 w-24 h-0 border-black" />
        </div>
      }
    />
  );
}

function ArtworkItem({ artwork }: { artwork: Artwork }) {
  return (
    <div className="flex flex-col justify-between aspect-[1/1] animate-fade-in">
      <SkeletonImage
        className="w-full h-2/3 object-cover"
        src={artwork.image.toString()}
        useHtmlImg
      />
      <div className="flex flex-col gap-2">
        <span className="font-roboto text-2xl">{artwork.name}</span>
        <span className="font-inter text-lg">By {artwork.artist}</span>
      </div>
      <EditDialog
        artwork={artwork}
        openButton={
          <Button className="p-6 w-full font-bold mx-auto cursor-pointer">
            MANAGE ARTWORK
          </Button>
        }
      />
    </div>
  );
}
