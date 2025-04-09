export type School =
  | "Ashton Meadows PS"
  | "Castlemore PS"
  | "Coledale PS"
  | "David Suzuki PS"
  | "Franklin Street PS"
  | "Legacy PS"
  | "Nokiidaa PS"
  | "Reesor Park PS"
  | "Roy H. Crosby PS"
  | "William Armstrong PS"
  | "Bill Crothers SS"
  | "Markham District HS"
  | "Unionville HS"
  | "Parkview PS";

export type ArtworkWithoutId = {
  artwork_url: URL;
  uploader_id: number;

  artist_name: string;
  title: string;
  medium: string;
  width: number;
  height: number;
  depth?: number;
  school: School;
  creation_date: Date;
  description: string;
  description_recording_url: URL;
};

export type Artwork = ArtworkWithoutId & {
  artwork_id: number;
};
