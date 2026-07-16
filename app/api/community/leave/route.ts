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

    const user =
      await prisma.user.findUnique({
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

    await prisma.communityMember.deleteMany(
      {
        where: {
          userId: user.id,
          communityId:
            body.communityId,
        },
      }
    );

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