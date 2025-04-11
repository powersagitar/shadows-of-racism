import { z } from "zod";

const School = z.enum([
  "Ashton Meadows PS",
  "Castlemore PS",
  "Coledale PS",
  "David Suzuki PS",
  "Franklin Street PS",
  "Legacy PS",
  "Nokiidaa PS",
  "Reesor Park PS",
  "Roy H. Crosby PS",
  "William Armstrong PS",
  "Bill Crothers SS",
  "Markham District HS",
  "Unionville HS",
  "Parkview PS",
]);

export type School = z.infer<typeof School>;

export const ArtworkClientUploadRequest = z.object({
  artist_fullname: z.string().min(1),
  artist_school: School,

  artwork_title: z.string().min(1),
  artwork_medium: z.string().min(1),
  artwork_width: z.number().int().positive(),
  artwork_height: z.number().int().positive(),
  artwork_depth: z.number().int().positive().optional(),
  artwork_creation_date: z.coerce.date().refine((date) => date <= new Date()),
});

export type ArtworkClientUploadRequest = z.infer<
  typeof ArtworkClientUploadRequest
>;

export type ArtworkServerUploadRequest = ArtworkClientUploadRequest & {
  uploader_id: number;
  artwork_url: URL;
};

export type Artwork = ArtworkServerUploadRequest & {
  artwork_id: number;
};
