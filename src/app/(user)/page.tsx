import { Hero } from "@/components/hero";
import { db } from "@/lib/db";
import { AboutOurCloth } from "./_components/about-our-cloth";
import { CategoryHero } from "./_components/category-hero";
import { MainCategories } from "./_components/main-categories";
import { NewArrival } from "./_components/new-arrival";
import { Suspense } from "react";

export default async function Home() {
  const categoryHeros = await db.categoryHero.findMany();

  const fallback = <div>Loading...</div>;
  return (
    <div className="h-full pb-10">
      <Hero />
      <div className="h-full flex flex-col gap-6 pt-[50vh]">
        <MainCategories />
        <div className="max-w-screen-lg mx-auto flex flex-col gap-20">
          <Suspense fallback={fallback}>
            <NewArrival />
          </Suspense>
          {categoryHeros.map(({ id, image, categories }) => (
            <Suspense fallback={fallback} key={id}>
              <CategoryHero key={id} image={image} categories={categories} />
            </Suspense>
          ))}
          <AboutOurCloth />
        </div>
      </div>
    </div>
  );
}
