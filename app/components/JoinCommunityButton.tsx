"use client";

import { useRouter } from "next/navigation";

export default function JoinCommunityButton({
  communityId,
  joined,
}: {
  communityId: string;
  joined: boolean;
}) {
  const router = useRouter();

  const handleClick = async () => {
    const endpoint = joined
      ? "/api/community/leave"
      : "/api/community/join";

    const res = await fetch(endpoint, {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        communityId,
      }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded text-white ${
        joined
          ? "bg-red-600"
          : "bg-blue-600"
      }`}
    >
      {joined ? "Leave" : "Join"}
    </button>
  );
}