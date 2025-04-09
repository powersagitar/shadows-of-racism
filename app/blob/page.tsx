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

    const { url: artworkUrl } = await put(
      `artworks/${uuid}/artwork.${imageFileExt}`,
      imageFile,
      { access: "public" },
    );

    const audioFile = formData.get("recording") as File;
    const audioFileExt = audioFile.type.split("/")[1];

    const { url: recordingUrl } = await put(
      `artworks/${uuid}/description.${audioFileExt}`,
      audioFile,
      { access: "public" },
    );

    const depth = formData.get("depth") as unknown as number;

    await insertArtwork({
      artwork_url: new URL(artworkUrl),
      uploader_id,
      artist_name: "dummy",
      title: "masterpiece",
      medium: "paint",
      width: 1920,
      height: 1080,
      depth,
      school: "Unionville HS",
      creation_date: new Date(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis mauris justo, a convallis nunc faucibus quis. Sed sed libero placerat, volutpat nisl id, fringilla lorem. Aenean eget leo vel risus consequat eleifend sed in libero. Pellentesque a ligula vulputate, posuere felis ac, interdum eros. In ac enim venenatis, pretium tortor luctus, dignissim tellus. Aliquam erat volutpat. Nam gravida dignissim placerat. Nunc tempor, nibh at congue placerat, tortor quam tempor erat, vitae placerat risus ipsum eu dui. Nunc dapibus, metus vel aliquet fringilla, ante metus cursus lorem, ac suscipit leo est in est. Praesent quis dui mauris. Ut sed elementum tellus. Nam vel magna et massa finibus sollicitudin non non velit.",
      description_recording_url: new URL(recordingUrl),
    });

    revalidatePath("/");
  }

  return (
    <form action={uploadImage}>
      <label>Image</label>
      <input type="file" id="image" name="image" accept="image/*" required />

      <label>recording</label>
      <input
        type="file"
        id="recording"
        name="recording"
        accept="audio/*"
        required
      />

      <label>depth</label>
      <input type="number" id="depth" name="depth" required />

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
