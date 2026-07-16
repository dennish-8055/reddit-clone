import { prisma } from "@/app/lib/prisma";
import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

export async function POST(
  req: Request
) {
  try {
    const { userId } =
      await auth();

    if (!userId) {
      return Response.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await req.json();

    const {
      postId,
      type,
    } = body;

    if (
      !postId ||
      !type
    ) {
      return Response.json(
        {
          error:
            "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    const clerkUser =
      await currentUser();

    let user =
      await prisma.user.findUnique(
        {
          where: {
            clerkId: userId,
          },
        }
      );

    if (!user) {
      user =
        await prisma.user.create({
          data: {
            clerkId: userId,

            email:
              clerkUser
                ?.emailAddresses?.[0]
                ?.emailAddress ||
              `user-${Date.now()}@example.com`,

            username:
              clerkUser?.username ||
              `user-${Date.now()}`,
          },
        });
    }

    // CHECK EXISTING VOTE
    const existingVote =
      await prisma.vote.findUnique(
        {
          where: {
            userId_postId: {
              userId:
                user.id,
              postId,
            },
          },
        }
      );

    // REMOVE SAME VOTE
    if (
      existingVote &&
      existingVote.type ===
        type
    ) {
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });

      return Response.json({
        success: true,
      });
    }

    // UPDATE VOTE
    if (existingVote) {
      await prisma.vote.update({
        where: {
          id: existingVote.id,
        },

        data: {
          type,
        },
      });

      return Response.json({
        success: true,
      });
    }

    // CREATE VOTE
    await prisma.vote.create({
      data: {
        type,

        userId: user.id,

        postId,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log(
      "VOTE ERROR:",
      error
    );

    return Response.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}