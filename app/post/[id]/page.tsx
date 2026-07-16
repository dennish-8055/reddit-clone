import Navbar from "@/app/components/Navbar";
import CommentForm from "@/app/components/CommentForm";
import DeletePostButton from "@/app/components/DeletePostButton";
import DeleteCommentButton from "@/app/components/DeleteCommentButton";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userId } = await auth();

  const currentUser =
    await prisma.user.findUnique({
      where: {
        clerkId: userId || "",
      },
    });

  const post = await prisma.post.findUnique({
    where: {
      id,
    },

    include: {
      author: true,

      comments: {
        include: {
          author: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },

      community: true,
    },
  });

  if (!post) {
    return (
      <div>
        <Navbar />

        <div className="p-6">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* POST */}
        <div className="border border-gray-800 rounded p-6 mb-6">
          <p className="text-sm text-gray-400 mb-2">
            Posted in r/{post.community.name}
          </p>

          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="text-gray-300 mb-4">
            {post.content}
          </p>

          {/* IMAGE */}
          {post.imageUrl && (
            <div className="mb-6">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={800}
                className="rounded-lg w-full h-auto max-h-[700px] object-cover"
                priority
              />
            </div>
          )}

          <p className="text-sm text-gray-500">
            Posted by{" "}
            <Link
              href={`/u/${post.author.username}`}
              className="hover:underline"
            >
              {post.author.username}
            </Link>
          </p>

          {/* ACTION BUTTONS */}
          {currentUser?.id ===
            post.authorId && (
            <div className="flex items-center gap-3 mt-4">
              <Link
                href={`/post/${post.id}/edit`}
                className="bg-blue-600 px-4 py-2 rounded text-white"
              >
                Edit Post
              </Link>

              <DeletePostButton
                postId={post.id}
              />
            </div>
          )}
        </div>

        {/* COMMENTS */}
        <div className="border border-gray-800 rounded p-6">
          <h2 className="text-2xl font-bold mb-4">
            Comments
          </h2>

          <CommentForm postId={post.id} />

          <div className="space-y-4 mt-6">
            {post.comments.map(
              (comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-800 rounded p-4"
                >
                  <p className="text-gray-300 mb-2">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <Link
                      href={`/u/${comment.author.username}`}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      {
                        comment.author
                          .username
                      }
                    </Link>

                    {currentUser?.id ===
                      comment.authorId && (
                      <DeleteCommentButton
                        commentId={
                          comment.id
                        }
                      />
                    )}
                  </div>
                </div>
              )
            )}

            {post.comments.length ===
              0 && (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}