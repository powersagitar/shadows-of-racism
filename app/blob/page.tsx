import { auth } from "@/auth";
import { insertArtwork } from "@/lib/db/artwork";
import { selectUserByEmail } from "@/lib/db/user";
import { User } from "@/lib/types/user";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

type FormProps = {
  user: Readonly<User>;
};

export async function Form({ user: { id: uploader_id } }: FormProps) {
  async function uploadImage(formData: FormData) {
    "use server";
    const imageFile = formData.get("image") as File;

    // TODO: give artworks better names
    const { url: artwork_url } = await put(
      "artworks/" + imageFile.name,
      imageFile,
      {
        access: "public",
      },
    );

    await insertArtwork({
      artwork_url,
      uploader_id,
      artist_name: "dummy",
      title: "masterpiece",
    });

    revalidatePath("/");
  }

  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button>Upload</button>
    </form>
  );
}

export default async function Blob() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return null;
  }

  const [user] = await selectUserByEmail(session.user.email);

  return <Form user={user} />;
}
