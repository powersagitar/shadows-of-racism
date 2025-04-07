import { auth } from "@/auth";
import { insertArtwork } from "@/lib/db/artwork";
import { selectUserByEmail } from "@/lib/db/user";
import { User } from "@/lib/types/user";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { v7 as uuidv7 } from "uuid";

type FormProps = {
  user: Readonly<User>;
};

async function Form({ user: { id: uploader_id } }: FormProps) {
  async function uploadImage(formData: FormData) {
    "use server";

    const uuid = uuidv7();

    const imageFile = formData.get("image") as File;
    const imageFileExt = imageFile.type.split("/")[1];

    const { url: artwork_url } = await put(
      `artworks/${uuid}/artwork.${imageFileExt}`,
      imageFile,
      { access: "public" },
    );

    const audioFile = formData.get("recording") as File;
    const audioFileExt = audioFile.type.split("/")[1];

    const { url: description_recording_url } = await put(
      `artworks/${uuid}/description.${audioFileExt}`,
      audioFile,
      { access: "public" },
    );

    await insertArtwork({
      artwork_url,
      uploader_id,
      artist_name: "dummy",
      title: "masterpiece",
      medium: "paint",
      width: 1920,
      height: 1080,
      description: "this is a masterpice",
      description_recording_url,
    });

    revalidatePath("/");
  }

  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" accept="image" required />

      <label htmlFor="image">recording</label>
      <input
        type="file"
        id="recording"
        name="recording"
        accept="audio"
        required
      />

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
