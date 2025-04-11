import { AspectRatio } from "@/components/ui/aspect-ratio";
import { selectArtworkById } from "@/lib/db/artwork";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";

type ArtworkProps = {
  params: Promise<{ id: string }>;
};

export default async function Artwork({ params }: ArtworkProps) {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    notFound();
  }

  const [artwork] = await selectArtworkById(id);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="mx-24 grid grid-cols-2 items-end gap-8">
      <AspectRatio ratio={50.5625 / 65.375}>
        <Image
          src={artwork.artwork_url.toString()}
          alt=""
          width={809}
          height={1046}
          className="h-full w-full shrink-0 object-cover"
        />
      </AspectRatio>

      <div className="flex flex-col gap-4">
        <h2 className="font-roboto -mb-6 text-[4rem] font-[700] -tracking-[0.08rem]">
          {artwork.artist_fullname}
        </h2>

        <h1 className="font-roboto text-[6rem] font-[700] -tracking-[0.12rem]">
          <i>{artwork.artwork_title}</i>
        </h1>

        <div className="font-inter leading-[150%] font-[2rem]">
          {artwork.artwork_medium} | {artwork.artwork_height} x{" "}
          {artwork.artwork_width}{" "}
          {artwork.artwork_depth && <>x {artwork.artwork_depth}</>} |{" "}
          {artwork.artist_school} |{" "}
          {format(artwork.artwork_creation_date, "yyyy-MM-dd")}
        </div>

        {/* <audio */}
        {/*   controls */}
        {/*   src={artwork.description_recording_url.toString()} */}
        {/*   className="my-2 w-full" */}
        {/* /> */}
        {/**/}
        {/* <p className="font-inter leading-[150%] font-[2rem]"> */}
        {/*   {artwork.description} */}
        {/* </p> */}
      </div>
    </div>
  );
}
