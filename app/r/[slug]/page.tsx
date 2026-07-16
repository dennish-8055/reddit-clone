"use client";

import Navbar from "@/app/components/Navbar";
import ImageUpload from "@/app/components/ImageUpload";
import { useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

export const dynamic = "force-dynamic";

export default function CreatePostPage() {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const params = useParams();

  const router = useRouter();

  const createPost = async () => {
    try {
      setLoading(true);

      console.log(
        "FINAL IMAGE URL:"
      );

      console.log(imageUrl);

      const payload = {
        title,
        content,
        imageUrl,
        communitySlug:
          params.slug,
      };

      console.log(
        "PAYLOAD:"
      );

      console.log(payload);

      const res = await fetch(
        "/api/post/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      const data =
        await res.json();

      console.log(
        "SERVER RESPONSE:"
      );

      console.log(data);

      if (res.ok) {
        router.push(
          `/post/${data.id}`
        );
      } else {
        alert(
          data.error ||
            "Something went wrong"
        );
      }
    } catch (error) {
      console.log(
        "CREATE POST ERROR:"
      );

      console.log(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-8">
          Create Post
        </h1>

        {/* TITLE */}
        <input
          placeholder="Post title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-black text-white"
        />

        {/* CONTENT */}
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-black text-white h-40"
        />

        {/* IMAGE UPLOAD */}
        <div className="mb-4">
          <ImageUpload
            onChange={(
              url: string
            ) => {
              console.log(
                "SET IMAGE URL:"
              );

              console.log(url);

              setImageUrl(url);
            }}
          />
        </div>

        {/* IMAGE PREVIEW */}
        {imageUrl && (
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">
              Image Preview
            </p>

            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full max-h-[500px] object-cover rounded border border-gray-700"
            />
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={createPost}
          disabled={loading}
          className="bg-white text-black px-5 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading
            ? "Creating..."
            : "Create Post"}
        </button>
      </div>
    </div>
  );
}