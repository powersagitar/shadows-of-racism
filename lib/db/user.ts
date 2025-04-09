import "server-only";

import { User, UserWithoutId } from "../types/user";
import { neon, neonConfig, Pool } from "@neondatabase/serverless";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

export const insertUser = async ({
  full_name,
  email,
  image,
}: Readonly<UserWithoutId>) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  // TODO: maybe consider reconnecting on error
  pool.on("error", (err) => console.error(err));

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      `
      INSERT INTO users (full_name, email, image)
      VALUES ($1, $2, $3)
      `,
      [full_name, email, image ?? null],
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

export const selectUserByEmail = async (email: string): Promise<User[]> => {
  const sql = neon(process.env.DATABASE_URL!);
  return sql`
    SELECT * FROM users WHERE email = ${email}
    ` as unknown as User[];
};
