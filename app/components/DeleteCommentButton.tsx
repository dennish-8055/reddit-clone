"use client";

import { useRouter } from "next/navigation";

export default function DeleteCommentButton({
  commentId,
}: {
  commentId: string;
}) {
  const router = useRouter();

  const deleteComment = async () => {
    const confirmed = confirm(
      "Delete this comment?"
    );

    if (!confirmed) return;

    const res = await fetch(
      "/api/comment/delete",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          commentId,
        }),
      }
    );

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <button
      onClick={deleteComment}
      className="bg-red-600 px-3 py-1 rounded text-white text-sm"
    >
      Delete
    </button>
  );
}