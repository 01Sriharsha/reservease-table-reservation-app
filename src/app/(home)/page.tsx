import RestaurantCard from "@/components/RestaurantCard";
import Search from "@/components/Search";
import prisma from "@/lib/PrismaClient";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {

  const restaurantsPromise = await prisma.restaurant.findMany({
    include: { location: true, reviews: true, cuisine: true },
  });

  const locationsPromise = await prisma.location.findMany();

  const [restaurants , locations] = await Promise.all([restaurantsPromise , locationsPromise])

  return (
    <>
      <header className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
        <div className="flex justify-center items-center flex-col h-full gap-6">
          <h1 className="text-[1.7rem] text-center md:text-[2.3rem] font-bold text-white capitalize">
            Find your table for any occassion
          </h1>
          <Suspense fallback={<h1>Fallback from home page</h1>}>
            <Search locations={locations} />
          </Suspense>
        </div>
      </header>

      <main className="max-w-7xl m-auto">
        <h2 className="text-2xl md:text-3xl font-bold mt-3 text-center text-slate-600 uppercase underline px-2">
          Popular restuarants
        </h2>
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 mdx:grid-cols-3 gap-4 place-items-center">
          {restaurants.length !== 0 ? (
            restaurants.map((restaurant) => (
              <Link
                href={`/restaurant/${restaurant.slug}`}
                key={restaurant.id}
                className="hover:scale-105 transition-all duration-300 ease-linear"
              >
                <RestaurantCard restaurant={restaurant} />
              </Link>
            ))
          ) : (
            <div>No Restaurants Available!!</div>
          )}
        </div>
      </main>
    </>
  );
}
