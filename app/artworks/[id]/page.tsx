import { AspectRatio } from "@/components/ui/aspect-ratio";
import { selectArtworkById } from "@/lib/db/artwork";
import Image from "next/image";

type ArtworkProps = {
  params: Promise<{ id: string }>;
};

export default async function Artwork({ params }: ArtworkProps) {
  // TODO: error handling
  const id = parseInt((await params).id);
  const [artwork] = await selectArtworkById(id);

  return (
    <div className="mx-24 grid grid-cols-2 items-end gap-8">
      <AspectRatio ratio={50.5625 / 65.375}>
        <Image
          src={artwork.artwork_url}
          alt=""
          width={809}
          height={1046}
          className="h-full w-full shrink-0 object-cover"
        />
      </AspectRatio>

      <div className="flex flex-col gap-4">
        <h2 className="font-roboto text-[4rem] font-[700] -tracking-[0.08rem]">
          [artist]
        </h2>

        <h1 className="font-roboto text-[6rem] font-[700] -tracking-[0.12rem]">
          <i>[artwork name]</i>
        </h1>

        <div className="font-inter leading-[150%] font-[2rem]">
          medium | size | school | date
        </div>

        <p className="font-inter leading-[150%] font-[2rem]">
          Excepteur efficient emerging, minim veniam anim aute carefully curated
          Ginza conversation exquisite perfect nostrud nisi intricate Content.
          Qui international first-class nulla ut. Punctual adipisicing,
          essential lovely queen tempor eiusmod irure. Exclusive izakaya
          charming Scandinavian impeccable aute quality of life soft power
          pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et
          Porter destination Toto remarkable officia Helsinki excepteur Basset
          hound. Zürich sleepy perfect consectetur.
        </p>
      </div>
    </div>
  );
}
