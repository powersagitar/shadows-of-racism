import { auth, signIn, signOut } from "@/auth";
import { addUser, selectUserByEmail } from "@/lib/db/user";
import { User } from "@/lib/types/user";
import { revalidatePath } from "next/cache";

export default async function Account() {
  const session = await auth();

  if (!session) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    );
  }

  const [user] = (await selectUserByEmail(session.user!.email!)) as [User];

  if (!user) {
    return (
      <form
        action={async (formData) => {
          "use server";
          const role = formData.get("role") as "teacher" | "artist";
          await addUser({
            name: session.user!.name!,
            email: session.user!.email!,
            role,
            image: session.user!.image ?? undefined,
          });
          revalidatePath("/account");
        }}
      >
        <p>select role</p>
        <label>Teacher</label>
        <input type="radio" name="role" value="teacher" />
        <label>Artist</label>
        <input type="radio" name="role" value="artist" defaultChecked />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <>
      <p>role: {user.role}</p>
      <img src={user.image} alt={user.name} />
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}
