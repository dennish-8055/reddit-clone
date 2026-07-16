"use client";

import Link from "next/link";
import {
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } =
    useUser();

  return (
    <nav className="border-b border-gray-800 bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* LOGO */}
      <Link
        href="/"
        className="text-2xl font-bold"
      >
        Reddit Clone
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="hover:text-gray-300 transition"
        >
          Home
        </Link>

        <Link
          href="/communities"
          className="hover:text-gray-300 transition"
        >
          Communities
        </Link>

        <Link
          href="/search"
          className="hover:text-gray-300 transition"
        >
          Search
        </Link>

        {isSignedIn && (
          <Link
            href="/create-community"
            className="bg-white text-black px-4 py-2 rounded-md"
          >
            Create Community
          </Link>
        )}

        {!isSignedIn ? (
          <SignInButton mode="modal">
            <button className="bg-white text-black px-4 py-2 rounded-md">
              Sign In
            </button>
          </SignInButton>
        ) : (
          <UserButton />
        )}
      </div>
    </nav>
  );
}