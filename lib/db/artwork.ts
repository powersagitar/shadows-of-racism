import "server-only";

import { neonConfig, Pool } from "@neondatabase/serverless";

import ws from "ws";
import { ArtworkWithoutId } from "../types/artwork";
neonConfig.webSocketConstructor = ws;

export const insertArtwork = async ({
  artwork_url,
  uploader_id,
  artist_name,
  title,
}: ArtworkWithoutId) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  pool.on("error", (err) => console.error(err));

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      `
      INSERT INTO artworks (artwork_url, uploader_id, artist_name, title)
      VALUES ($1, $2, $3, $4)
      `,
      [artwork_url, uploader_id, artist_name, title],
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
