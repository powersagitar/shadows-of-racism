import { auth } from "@/auth";

export default async function LoginStatus() {
  const session = await auth();

  if (!session) {
    return <span>not signed in</span>;
  }

  return <span>signed in as {session.user?.email}</span>;
}
