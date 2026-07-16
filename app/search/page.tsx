import Navbar from "@/app/components/Navbar";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } =
    await searchParams;

  const communities =
    await prisma.community.findMany({
      where: {
        name: {
          contains: q || "",
          mode: "insensitive",
        },
      },

      include: {
        members: true,
      },
    });

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">
          Search Communities
        </h1>

        <form
          action="/search"
          className="mb-8"
        >
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search communities..."
            className="w-full p-3 border border-gray-700 rounded bg-black"
          />
        </form>

        <div className="space-y-4">
          {communities.map(
            (community) => (
              <Link
                key={community.id}
                href={`/r/${community.slug}`}
              >
                <div className="border border-gray-800 rounded p-4 hover:border-gray-600 transition cursor-pointer">
                  <h2 className="text-2xl font-bold">
                    r/
                    {
                      community.name
                    }
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {
                      community.members
                        .length
                    }{" "}
                    members
                  </p>
                </div>
              </Link>
            )
          )}

          {communities.length ===
            0 && (
            <p>
              No communities found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}