import Navbar from "@/app/components/Navbar";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CommunitiesPage() {
  const communities =
    await prisma.community.findMany({
      include: {
        members: true,
        posts: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-8">
          Communities
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          {communities.map(
            (community) => (
              <Link
                key={community.id}
                href={`/r/${community.slug}`}
              >
                <div className="border border-gray-800 rounded p-5 hover:border-gray-600 transition cursor-pointer">
                  <h2 className="text-2xl font-bold mb-2">
                    r/{community.name}
                  </h2>

                  <p className="text-gray-400">
                    {
                      community
                        .members.length
                    }{" "}
                    members
                  </p>

                  <p className="text-gray-500 mt-2">
                    {
                      community.posts
                        .length
                    }{" "}
                    posts
                  </p>
                </div>
              </Link>
            )
          )}

          {communities.length ===
            0 && (
            <p>
              No communities yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}