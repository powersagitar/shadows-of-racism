import "server-only";

import { User, UserWithoutId } from "../types/user";
import { neon, neonConfig, Pool } from "@neondatabase/serverless";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

export const addUser = async ({
  name,
  email,
  role,
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
      INSERT INTO users (name, email, role, image)
      VALUES ($1, $2, $3, $4)
      `,
      [name, email, role, image ?? null],
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
