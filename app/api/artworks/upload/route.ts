import { auth } from "@/auth";
import { insertArtwork } from "@/lib/db/artwork";
import { selectUserByEmail } from "@/lib/db/user";
import { ArtworkClientUploadRequest } from "@/lib/types/artwork";
import { PutBlobResult } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken,
      onUploadCompleted,
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}

type TokenPayload = {
  artwork: ArtworkClientUploadRequest;
  uploader_id: number;
};

const onBeforeGenerateToken = async (
  _: string,
  clientPayload: string | null,
) => {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("not authenticated");
  }

  const [user] = await selectUserByEmail(session.user.email);
  if (!user) {
    throw new Error("unregistered");
  }

  console.log("before parsing");

  // TODO: error handling
  const artwork = ArtworkClientUploadRequest.parse(clientPayload);

  console.log("after parsing");

  const tokenPayload: TokenPayload = {
    artwork,
    uploader_id: user.id,
  };

  return {
    allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
    tokenPayload: JSON.stringify(tokenPayload),
  };
};

const onUploadCompleted = async ({
  blob,
  tokenPayload,
}: {
  blob: PutBlobResult;
  tokenPayload?: string | null;
}) => {
  console.log("on upload complete");

  const { artwork, uploader_id }: TokenPayload = JSON.parse(tokenPayload!);

  await insertArtwork({
    ...artwork,
    artwork_url: new URL(blob.url),
    uploader_id,
  });
};
