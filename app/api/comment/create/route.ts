import { prisma } from "@/app/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { postId, content } = body;

    if (!postId || !content) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const clerkUser = await currentUser();

    let user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,

          email:
            clerkUser?.emailAddresses?.[0]
              ?.emailAddress ||
            `user-${Date.now()}@example.com`,

          username:
            clerkUser?.username ||
            `user-${Date.now()}`,
        },
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content,

        postId,

        authorId: user.id,
      },

      include: {
        author: true,
      },
    });

    return Response.json(comment);
  } catch (error) {
    console.log("COMMENT ERROR:", error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}