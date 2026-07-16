"use client";

import Navbar from "@/app/components/Navbar";
import ImageUpload from "@/app/components/ImageUpload";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { useState } from "react";

export default function CreatePostPage() {
  const params = useParams();

  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function createPost() {
    try {
      setLoading(true);

      console.log(
        "FINAL IMAGE URL:",
        imageUrl
      );

      const payload = {
        title,
        content,
        imageUrl,
        communitySlug:
          params.slug,
      };

      console.log(
        "PAYLOAD:",
        payload
      );

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
        "SERVER RESPONSE:",
        data
      );

      if (!res.ok) {
        alert(
          data.error ||
            "Something went wrong"
        );

        return;
      }

      router.push(
        `/post/${data.id}`
      );
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-8">
          Create Post
        </h1>

        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-black text-white"
        />

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
        <ImageUpload
          onChange={(url) => {
            console.log(
              "SET IMAGE URL:",
              url
            );

            setImageUrl(url);
          }}
        />

        {/* IMAGE PREVIEW */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full rounded mb-6 mt-4"
          />
        )}

        <button
          onClick={createPost}
          disabled={
            loading
          }
          className="bg-white text-black px-5 py-2 rounded font-semibold"
        >
          {loading
            ? "Creating..."
            : "Create Post"}
        </button>
      </div>
    </div>
  );
}