import { auth, signIn, signOut } from "@/auth";
import { addUser, selectUserByEmail } from "@/lib/db/user";
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

  if (user) {
    return (
      <>
        <p>full name: {user.full_name}</p>
        <img src={user.image} alt={user.full_name} />
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
  } else if (isTeacher(session.user?.email!)) {
    return (
      <form
        action={async () => {
          "use server";
          await addUser({
            full_name: session.user!.name!,
            email: session.user!.email!,
            image: session.user!.image ?? undefined,
          });
          revalidatePath("/account");
        }}
      >
        <p>Finish account creation Email: {session.user!.email!}</p>
        <button type="submit">Create Account</button>
      </form>
    );
  } else {
    return <p>only yrdsb teachers can create accounts</p>;
  }
}

const isTeacher = (email: string): boolean => {
  const teacherEmail = /^\w+\.\w+@gapps\.yrdsb\.ca$/;
  return teacherEmail.test(email);
};
