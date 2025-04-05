import { AspectRatio } from "@/components/ui/aspect-ratio";

type ArtworkProps = {
  params: Promise<{ id: number }>;
};

export default async function Artwork({ params }: ArtworkProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = (await params).id;

  return (
    <div className="grid grid-cols-2 gap-8 items-end mx-24">
      <AspectRatio ratio={50.5625 / 65.375}>
        <img
          src="https://picsum.photos/1920/1080"
          alt=""
          className="object-cover w-full h-full shrink-0"
        />
      </AspectRatio>

      <div className="flex flex-col gap-4">
        <h2 className="text-[4rem] font-[700] font-roboto -tracking-[0.08rem]">
          [artist]
        </h2>

        <h1 className="text-[6rem] font-[700] font-roboto -tracking-[0.12rem]">
          <i>[artwork name]</i>
        </h1>

        <div className="font-inter font-[2rem] leading-[150%]">
          medium | size | school | date
        </div>

        <p className="font-[2rem] font-inter leading-[150%]">
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
