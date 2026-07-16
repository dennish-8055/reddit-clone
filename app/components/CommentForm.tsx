"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({
  postId,
}: {
  postId: string;
}) {
  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  const createComment =
    async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "/api/comment/create",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              postId,
              content,
            }),
          }
        );

        if (res.ok) {
          setContent("");

          router.refresh();
        } else {
          const data =
            await res.json();

          alert(
            data.error ||
              "Something went wrong"
          );
        }
      } catch (error) {
        console.log(error);

        alert(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mb-6">
      <textarea
        placeholder="Write a comment..."
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        className="w-full p-3 border border-gray-700 rounded bg-black text-white h-28 mb-3"
      />

      <button
        onClick={createComment}
        disabled={
          loading ||
          !content.trim()
        }
        className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
      >
        {loading
          ? "Posting..."
          : "Comment"}
      </button>
    </div>
  );
}