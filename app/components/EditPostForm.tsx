"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPostForm({
  post,
}: {
  post: {
    id: string;
    title: string;
    content: string;
  };
}) {
  const router = useRouter();

  const [title, setTitle] = useState(
    post.title
  );

  const [content, setContent] =
    useState(post.content);

  const [loading, setLoading] =
    useState(false);

  const updatePost = async () => {
    setLoading(true);

    const res = await fetch(
      "/api/post/edit",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          postId: post.id,
          title,
          content,
        }),
      }
    );

    setLoading(false);

    if (res.ok) {
      router.push(`/post/${post.id}`);
      router.refresh();
    } else {
      alert("Failed to update post");
    }
  };

  return (
    <div className="space-y-4">
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full p-3 border border-gray-700 rounded bg-black"
      />

      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="w-full p-3 border border-gray-700 rounded bg-black h-40"
      />

      <button
        onClick={updatePost}
        disabled={loading}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        {loading
          ? "Updating..."
          : "Update Post"}
      </button>
    </div>
  );
}