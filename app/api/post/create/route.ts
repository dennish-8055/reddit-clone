import { prisma } from "@/app/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const { title, content, communitySlug, imageUrl } = body;

    if (!title || !content || !communitySlug) {
      return Response.json(
        {
          error: "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    const community = await prisma.community.findUnique({
      where: {
        slug: communitySlug,
      },
    });

    if (!community) {
      return Response.json(
        {
          error: "Community not found",
        },
        {
          status: 404,
        }
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
            clerkUser?.emailAddresses?.[0]?.emailAddress ||
            `user-${Date.now()}@example.com`,
          username:
            clerkUser?.username ||
            `user-${Date.now()}`,
        },
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        communityId: community.id,
        authorId: user.id,
      },
    });

    return Response.json(post);
  } catch (error) {
    console.log("POST CREATE ERROR:", error);

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