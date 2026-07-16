"use client";

import Navbar from "../components/Navbar";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import {
  useUser,
  SignInButton,
} from "@clerk/nextjs";

export default function CreateCommunityPage() {
  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  const {
    isLoaded,
    isSignedIn,
  } = useUser();

  // REDIRECT IF NOT SIGNED IN
  useEffect(() => {
    if (
      isLoaded &&
      !isSignedIn
    ) {
      router.push("/");
    }
  }, [
    isLoaded,
    isSignedIn,
    router,
  ]);

  async function handleCreateCommunity(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/community/create",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
            }),
          }
        );

      const data =
        await response.json();

      if (response.ok) {
        router.push("/");
      } else {
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
  }

  // LOADING STATE
  if (!isLoaded) {
    return (
      <div>
        <Navbar />

        <div className="p-6">
          Loading...
        </div>
      </div>
    );
  }

  // NOT SIGNED IN
  if (!isSignedIn) {
    return (
      <div>
        <Navbar />

        <div className="max-w-xl mx-auto p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Sign in required
          </h1>

          <SignInButton mode="modal">
            <button className="bg-white text-black px-4 py-2 rounded">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">
          Create Community
        </h1>

        <form
          onSubmit={
            handleCreateCommunity
          }
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Community Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full p-3 rounded-md bg-zinc-900 border border-zinc-700 text-white"
            required
          />

          <button
            type="submit"
            disabled={
              loading ||
              !name.trim()
            }
            className="bg-white text-black px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Community"}
          </button>
        </form>
      </div>
    </div>
  );
}