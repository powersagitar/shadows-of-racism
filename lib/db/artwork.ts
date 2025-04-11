import "server-only";

import { neon, neonConfig, Pool } from "@neondatabase/serverless";

import { Artwork, ArtworkServerUploadRequest, School } from "../types/artwork";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

export const insertArtwork = async (artwork: ArtworkServerUploadRequest) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  pool.on("error", (err) => console.error(err));

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      `
      INSERT INTO artworks
      (
        artist_fullname,
        artist_school,
        artwork_title,
        artwork_medium,
        artwork_width,
        artwork_height,
        artwork_depth,
        artwork_creation_date,
        uploader_id,
        artwork_url
      )

      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
      [
        artwork.artist_fullname,
        artwork.artist_school,
        artwork.artwork_title,
        artwork.artwork_medium,
        artwork.artwork_width,
        artwork.artwork_height,
        artwork.artwork_depth,
        artwork.artwork_creation_date.toISOString(),
        artwork.uploader_id,
        artwork.artwork_url.toString(),
      ],
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  await pool.end();
};

const sql = neon(process.env.DATABASE_URL!);

export const selectArtworkById = async (id: number): Promise<Artwork[]> => {
  return sql`
    SELECT * FROM artworks
    WHERE artwork_id = ${id}
  ` as unknown as Artwork[];
};

type ArtworksPaginatedResponse = {
  artworks: Artwork[];
  offset: number;
};

export const selectArtworks = async (
  pageSize: number,
  offset: number,
): Promise<ArtworksPaginatedResponse> => {
  const artworks = (await sql`
    SELECT * FROM artworks
    ORDER BY artwork_id
    LIMIT ${pageSize}
    OFFSET ${offset}
  `) as Artwork[];

  return {
    artworks,
    offset: offset + pageSize,
  };
};

export const selectArtworksBySchool = async (
  school: School,
  pageSize: number,
  offset: number,
): Promise<ArtworksPaginatedResponse> => {
  const artworks = (await sql`
    SELECT * FROM artworks
    WHERE school = ${school}
    ORDER BY artwork_id
    LIMIT ${pageSize}
    OFFSET ${offset} 
  `) as Artwork[];

  return {
    artworks,
    offset: offset + pageSize,
  };
};

export const selectArtworksByUploader = async (
  uploaderId: number,
  pageSize: number,
  offset: number,
): Promise<ArtworksPaginatedResponse> => {
  const artworks = (await sql`
    SELECT * FROM artworks
    WHERE uploader_id = ${uploaderId}
    ORDER BY artwork_id
    LIMIT ${pageSize}
    OFFSET ${offset} 
  `) as Artwork[];

  return {
    artworks,
    offset: offset + pageSize,
  };
};
