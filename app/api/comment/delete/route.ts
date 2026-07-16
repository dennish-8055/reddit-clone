import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const comment =
      await prisma.comment.findUnique({
        where: {
          id: body.commentId,
        },
      });

    if (!comment) {
      return Response.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Only author can delete
    if (comment.authorId !== user.id) {
      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await prisma.comment.delete({
      where: {
        id: comment.id,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}