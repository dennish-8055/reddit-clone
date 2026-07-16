import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request
) {
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

    const community =
      await prisma.community.create({
        data: {
          name: body.name,
          slug: body.name
            .toLowerCase()
            .replace(/\s+/g, "-"),
        },
      });

    return Response.json(
      community
    );
  } catch (error) {
    console.log(
      "COMMUNITY CREATE ERROR:",
      error
    );

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