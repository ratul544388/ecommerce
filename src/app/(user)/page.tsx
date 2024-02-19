import { Hero } from "@/components/hero";
import { AboutOurCloth } from "./_components/about-our-cloth";
import { MainCategories } from "./_components/main-categories";
import { CategoryHero } from "./_components/category-hero";
import { db } from "@/lib/db";
import { NewArrival } from "./_components/new-arrival";

export default async function Home() {
  const categoryHeros = await db.categoryHero.findMany();
  return (
    <div className="h-full pb-10">
      <Hero />
      <div className="h-full space-y-5 pt-[50vh]">
        <MainCategories />
        <NewArrival />
        <div className="max-w-screen-lg mx-auto flex flex-col gap-20 pt-14">
          {categoryHeros.map(({ id, image, categories }) => (
            <CategoryHero key={id} image={image} categories={categories} />
          ))}
          <AboutOurCloth />
        </div>
      </div>
    </div>
  );
}
