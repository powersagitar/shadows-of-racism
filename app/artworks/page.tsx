import Button from "@/components/ui/button";
import { selectArtworks } from "@/lib/db/artwork";
import Image from "next/image";
// import { redirect } from "next/navigation";

// TODO: pagination

type ArtworksProps = {
  searchParams: Promise<{ offset: string }>;
};

export default async function Artworks(props: ArtworksProps) {
  const searchParams = await props.searchParams;

  // https://stackoverflow.com/a/7540412/20143641
  const offset = parseInt(searchParams["offset"]) || 0;

  // const { artworks, offset: newOffset } = await selectArtworks(9, offset);
  const { artworks } = await selectArtworks(9, offset);

  return (
    <div className="mx-24">
      <h1 className="font-roboto h-40 content-center text-[8rem] leading-[75%] font-[500] -tracking-[0.4rem]">
        GALLERY
      </h1>

      <Button variant="default" className="my-4">
        SCHOOL
      </Button>

      <div className="grid grid-cols-3 gap-8">
        {artworks.map((artwork) => (
          <div
            key={artwork.artwork_url.toString()}
            className="flex flex-col gap-4"
          >
            <Image
              src={artwork.artwork_url.toString()}
              alt={artwork.description}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />

            <div>
              <p className="font-inter text-[1.5rem] leading-[150%] font-[500]">
                {artwork.artist_name} | {artwork.school}
              </p>
              <h2 className="font-roboto text-[2rem] leading-[150%] font-[700]">
                <i>{artwork.title}</i>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
