"use client";

import { ArtworkClientUploadRequest } from "@/lib/types/artwork";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import { v7 as uuidv7 } from "uuid";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Artwork</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const uuid = uuidv7();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];
          const fileExt = file.type.split("/")[1];

          const metadata: ArtworkClientUploadRequest = {
            artist_fullname: "Dummy",
            artist_school: "Unionville HS",
            artwork_creation_date: new Date(),
            artwork_height: 1080,
            artwork_width: 1920,
            artwork_medium: "Paint",
            artwork_title: "Masterpiece",
          };

          const newBlob = await upload(`artworks/${uuid}.${fileExt}`, file, {
            access: "public",
            handleUploadUrl: "/api/artworks/upload",
            clientPayload: JSON.stringify(metadata),
          });

          setBlob(newBlob);
        }}
      >
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/jpeg, image/png, image/gif"
          required
        />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
