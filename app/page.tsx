import Navbar from "@/app/components/Navbar";
import VoteButtons from "@/app/components/VoteButtons";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
  }>;
}) {
  const { sort } =
    await searchParams;

  const posts =
    await prisma.post.findMany({
      include: {
        author: true,
        community: true,
        votes: true,
      },

      orderBy:
        sort === "popular"
          ? {
              votes: {
                _count: "desc",
              },
            }
          : {
              createdAt:
                "desc",
            },
    });

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-bold">
            Home Feed
          </h1>

          {/* SORT BUTTONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/?sort=latest"
              className="bg-white text-black px-4 py-2 rounded"
            >
              Latest
            </Link>

            <Link
              href="/?sort=popular"
              className="bg-white text-black px-4 py-2 rounded"
            >
              Popular
            </Link>
          </div>
        </div>

        {/* POSTS */}
        <div className="space-y-4">
          {posts.map((post) => {
            const score =
              post.votes.reduce(
                (acc, vote) => {
                  if (
                    vote.type ===
                    "UP"
                  )
                    return acc + 1;

                  return acc - 1;
                },
                0
              );

            return (
              <div
                key={post.id}
                className="border border-gray-800 rounded p-5"
              >
                <Link
                  href={`/post/${post.id}`}
                >
                  <div className="cursor-pointer">
                    <p className="text-sm text-gray-400 mb-2">
                      Posted in r/
                      {
                        post
                          .community
                          .name
                      }
                    </p>

                    <h2 className="text-3xl font-bold mb-3">
                      {post.title}
                    </h2>

                    <p className="text-gray-300 mb-4">
                      {post.content}
                    </p>

                    {/* IMAGE */}
                    {post.imageUrl && (
                      <img
                        src={
                          post.imageUrl
                        }
                        alt={
                          post.title
                        }
                        className="w-full max-h-[500px] object-cover rounded mb-4"
                      />
                    )}
                  </div>
                </Link>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/u/${post.author.username}`}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    by{" "}
                    {
                      post.author
                        .username
                    }
                  </Link>

                  <VoteButtons
                    postId={
                      post.id
                    }
                    initialScore={
                      score
                    }
                  />
                </div>
              </div>
            );
          })}

          {posts.length === 0 && (
            <p>No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}