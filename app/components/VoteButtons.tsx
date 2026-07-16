"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VoteButtons({
  postId,
  initialScore,
}: {
  postId: string;
  initialScore: number;
}) {
  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  const vote = async (
    type: "UP" | "DOWN"
  ) => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/vote",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            postId,
            type,
          }),
        }
      );

      if (res.ok) {
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
    <div className="flex items-center gap-3">
      {/* UPVOTE */}
      <button
        onClick={() =>
          vote("UP")
        }
        disabled={loading}
        className="bg-green-600 px-3 py-1 rounded text-white"
      >
        ▲
      </button>

      {/* SCORE */}
      <p className="text-white font-bold">
        {initialScore}
      </p>

      {/* DOWNVOTE */}
      <button
        onClick={() =>
          vote("DOWN")
        }
        disabled={loading}
        className="bg-red-600 px-3 py-1 rounded text-white"
      >
        ▼
      </button>
    </div>
  );
}