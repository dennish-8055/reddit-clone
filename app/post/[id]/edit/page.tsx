import Navbar from "@/app/components/Navbar";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EditPostForm from "@/app/components/EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const currentUser =
    await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

  if (!currentUser) {
    redirect("/");
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
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

  if (post.authorId !== currentUser.id) {
    redirect("/");
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">
          Edit Post
        </h1>

        <EditPostForm post={post} />
      </div>
    </div>
  );
}