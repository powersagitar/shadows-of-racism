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

  const [user] = await selectUserByEmail(session.user!.email!);

  if (!user) {
    try {
      const role = getRole(session.user!.email!);

      return (
        <form
          action={async () => {
            "use server";
            await addUser({
              name: session.user!.name!,
              email: session.user!.email!,
              role,
              image: session.user!.image ?? undefined,
            });
            revalidatePath("/account");
          }}
        >
          Finish account creation Email: {session.user!.email!}
          Role: {role}
          <button type="submit">Create Account</button>
        </form>
      );
    } catch (err) {
      console.warn(err);
      return <p>site for yrdsb students and teachers only</p>;
    }
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

const getRole = (email: string): User["role"] => {
  const artistEmail = /^[0-9]{9}@gapps\.yrdsb\.ca$/g;
  const teacherEmail = /^\w+\.\w+@gapps\.yrdsb\.ca$/g;

  if (artistEmail.test(email)) {
    return "artist";
  } else if (teacherEmail.test(email)) {
    return "teacher";
  } else {
    throw new Error("Invalid email");
  }
};
