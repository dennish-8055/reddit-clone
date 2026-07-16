import Navbar from "@/app/components/Navbar";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },

    include: {
      posts: {
        include: {
          community: true,
          votes: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },

      comments: {
        include: {
          post: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return (
      <div>
        <Navbar />

        <div className="p-6">
          User not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {/* PROFILE */}
        <div className="border border-gray-800 rounded p-6 mb-8">
          <h1 className="text-5xl font-bold mb-3">
            u/{user.username}
          </h1>

          <p className="text-gray-400">
            {user.posts.length} posts •{" "}
            {user.comments.length} comments
          </p>
        </div>

        {/* POSTS */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-5">
            Posts
          </h2>

          <div className="space-y-4">
            {user.posts.map((post) => {
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
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                >
                  <div className="border border-gray-800 rounded p-5 hover:border-gray-600 transition cursor-pointer">
                    <p className="text-sm text-gray-400 mb-2">
                      r/
                      {
                        post.community
                          .name
                      }
                    </p>

                    <h3 className="text-2xl font-bold mb-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 mb-3">
                      {post.content}
                    </p>

                    <p className="text-sm text-gray-500">
                      Score: {score}
                    </p>
                  </div>
                </Link>
              );
            })}

            {user.posts.length === 0 && (
              <p>No posts yet.</p>
            )}
          </div>
        </div>

        {/* COMMENTS */}
        <div>
          <h2 className="text-3xl font-bold mb-5">
            Comments
          </h2>

          <div className="space-y-4">
            {user.comments.map(
              (comment) => (
                <Link
                  key={comment.id}
                  href={`/post/${comment.postId}`}
                >
                  <div className="border border-gray-800 rounded p-5 hover:border-gray-600 transition cursor-pointer">
                    <p className="text-sm text-gray-400 mb-2">
                      On post:
                      {" "}
                      {
                        comment.post
                          .title
                      }
                    </p>

                    <p className="text-gray-300">
                      {
                        comment.content
                      }
                    </p>
                  </div>
                </Link>
              )
            )}

            {user.comments.length ===
              0 && (
              <p>
                No comments yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}