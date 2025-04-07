export type ArtworkWithoutId = {
  artwork_url: string;
  uploader_id: number;

  artist_name: string;
  title: string;
  medium: string;
  width: number;
  height: number;
  description: string;
  description_recording_url: string;
};

export type Artwork = ArtworkWithoutId & {
  artwork_id: number;
};
