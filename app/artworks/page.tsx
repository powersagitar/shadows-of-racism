import { retrieveArtworks } from "@/lib/db/artwork";
import { redirect } from "next/navigation";

type ArtworksProps = {
  searchParams: Promise<{ offset: string }>;
};

export default async function Artworks(props: ArtworksProps) {
  const searchParams = await props.searchParams;

  // https://stackoverflow.com/a/7540412/20143641
  const offset = parseInt(searchParams["offset"]) || 0;

  const { artworks, offset: newOffset } = await retrieveArtworks(2, offset);

  return (
    <>
      <h1>artworks</h1>

      {artworks.map((artwork) => (
        <img src={artwork.artwork_url} key={artwork.artwork_url} />
      ))}

      <form
        action={async () => {
          "use server";
          redirect(`/artworks?offset=${newOffset}`);
        }}
      >
        <button type="submit">next page</button>
      </form>
    </>
  );
}
