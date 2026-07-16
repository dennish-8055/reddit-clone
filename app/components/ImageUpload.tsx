"use client";

import { UploadButton } from "@/app/utils/uploadthing";

export default function ImageUpload({
  onChange,
}: {
  onChange: (url: string) => void;
}) {
  return (
    <div className="mb-6">
      <UploadButton
        endpoint="imageUploader"
        appearance={{
          button:
            "bg-white text-black ut-ready:bg-white ut-uploading:bg-gray-400 rounded px-4 py-2",
          allowedContent:
            "text-gray-400",
        }}
        onClientUploadComplete={(res) => {
          console.log(
            "UPLOAD RESPONSE:",
            res
          );

          if (res && res[0]) {
            const imageUrl =
              res[0].ufsUrl;

            console.log(
              "IMAGE URL:",
              imageUrl
            );

            onChange(imageUrl);
          }
        }}
        onUploadError={(
          error: Error
        ) => {
          console.error(
            "UPLOAD ERROR:",
            error
          );

          alert(error.message);
        }}
      />
    </div>
  );
}