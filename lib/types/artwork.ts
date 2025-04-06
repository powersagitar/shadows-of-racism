export type ArtworkWithoutId = {
  artwork_url: string;
  uploader_id: number;
  artist_name: string;
  title: string;
};

export type Artwork = ArtworkWithoutId & {
  artwork_id: number;
};
