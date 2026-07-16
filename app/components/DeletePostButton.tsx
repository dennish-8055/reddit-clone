"use client";

import { useRouter } from "next/navigation";

export default function DeletePostButton({
  postId,
}: {
  postId: string;
}) {
  const router = useRouter();

  const deletePost = async () => {
    const confirmed = confirm(
      "Delete this post?"
    );

    if (!confirmed) return;

    const res = await fetch(
      "/api/post/delete",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      }
    );

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <button
      onClick={deletePost}
      className="bg-red-600 px-4 py-2 rounded text-white mt-4"
    >
      Delete Post
    </button>
  );
}